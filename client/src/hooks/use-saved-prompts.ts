import { useState, useCallback } from "react";

export interface SavedPrompt {
  id: string;
  title: string;
  content: string;
  toolType: string;
  toolLabel: string;
  timestamp: number;
}

const STORAGE_KEY = "dfk_saved_prompts";

function load(): SavedPrompt[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function save(prompts: SavedPrompt[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prompts));
}

export type DayGroup = "Today" | "Yesterday" | "Previous 7 days" | "Previous 30 days" | "Older";

export function getGroup(timestamp: number): DayGroup {
  const now = Date.now();
  const diff = now - timestamp;
  const day = 24 * 60 * 60 * 1000;
  if (diff < day) return "Today";
  if (diff < 2 * day) return "Yesterday";
  if (diff < 7 * day) return "Previous 7 days";
  if (diff < 30 * day) return "Previous 30 days";
  return "Older";
}

export const DAY_GROUPS: DayGroup[] = [
  "Today",
  "Yesterday",
  "Previous 7 days",
  "Previous 30 days",
  "Older",
];

export function useSavedPrompts() {
  const [prompts, setPrompts] = useState<SavedPrompt[]>(() => load());

  const savePrompt = useCallback((content: string, toolType: string, toolLabel: string) => {
    const newPrompt: SavedPrompt = {
      id: Date.now().toString(),
      title: content.replace(/^\[.*?\]\s*/, "").slice(0, 80),
      content,
      toolType,
      toolLabel,
      timestamp: Date.now(),
    };
    setPrompts((prev) => {
      const updated = [newPrompt, ...prev].slice(0, 200);
      save(updated);
      return updated;
    });
  }, []);

  const deletePrompt = useCallback((id: string) => {
    setPrompts((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      save(updated);
      return updated;
    });
  }, []);

  const clearAll = useCallback(() => {
    save([]);
    setPrompts([]);
  }, []);

  return { prompts, savePrompt, deletePrompt, clearAll };
}
