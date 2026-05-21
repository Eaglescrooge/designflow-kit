import { useState, useEffect, useRef } from "react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface UseSaveSessionOptions {
  messages: Message[];
  toolId: string;
  toolPath: string;
  toolLabel: string;
  onRestored?: (messages: Message[]) => void;
}

export function useSaveSession({ messages, toolId, toolPath, toolLabel, onRestored }: UseSaveSessionOptions) {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const promptedRef = useRef(false);

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("resume");
    if (!token || !onRestored) return;
    fetch(`/api/sessions/${token}`)
      .then((r) => r.json())
      .then((data) => {
        if (data?.messages) {
          onRestored(data.messages.map((m: { role: string; content: string }, i: number) => ({
            id: String(i),
            role: m.role as "user" | "assistant",
            content: m.content,
          })));
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (promptedRef.current) return;
    const alreadyPrompted = sessionStorage.getItem(`dfk_save_prompted_${toolId}`);
    if (alreadyPrompted) return;
    const hasAiResponse = messages.some((m) => m.role === "assistant");
    if (hasAiResponse && messages.length >= 2) {
      promptedRef.current = true;
      sessionStorage.setItem(`dfk_save_prompted_${toolId}`, "1");
      const timer = setTimeout(() => setShowBanner(true), 800);
      return () => clearTimeout(timer);
    }
  }, [messages, toolId]);

  async function handleSave(email: string) {
    const res = await fetch("/api/sessions/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        toolId,
        toolPath,
        toolLabel,
        messages: messages.map(({ role, content }) => ({ role, content })),
      }),
    });
    if (!res.ok) throw new Error("Failed to save");
  }

  function openModal() {
    setShowBanner(false);
    setShowModal(true);
  }

  function dismissBanner() {
    setShowBanner(false);
  }

  return { showBanner, showModal, setShowModal, openModal, dismissBanner, handleSave };
}
