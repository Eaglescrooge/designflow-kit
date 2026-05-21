import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { ChatMessage } from "@/components/chat-message";
import { MethodSelectorModal } from "@/components/method-selector-modal";
import { uxMethodsByWorkflow } from "@/lib/ux-method-options";
import type { UxMethodOption } from "@/lib/ux-method-options";
import { useAutomateGate } from "@/hooks/use-automate-gate";
import { AutomateGateModal, LockoutScreen } from "@/components/automate-gate-modal";
import { useSavedPrompts } from "@/hooks/use-saved-prompts";
import { SavedPromptsPane } from "@/components/saved-prompts-pane";
import {
  ArrowLeft,
  ArrowUp,
  Paperclip,
  X,
  FileText,
  GitBranch,
  Loader2,
  LayoutList,
  FlaskConical
} from "lucide-react";
import { WorkflowToolsPanel } from "@/components/workflow-tools-panel";
import { IA_TOOLS, IA_CATEGORIES } from "@/lib/workflow-tools-data";
import { SaveSessionModal, SaveSessionBanner } from "@/components/save-session-modal";
import { useSaveSession } from "@/hooks/use-save-session";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function UXInformationArchitecture() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [documentContent, setDocumentContent] = useState<string>("");
  const [showMethodModal, setShowMethodModal] = useState(false);
  const [pendingPrompt, setPendingPrompt] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const workflowMethods = uxMethodsByWorkflow["information-architecture"];
  const { showGate, isLocked, lockedUntil, checkGate, handleUnlocked, handleDismissed, openGate } = useAutomateGate();
  const { prompts, savePrompt, deletePrompt, clearAll } = useSavedPrompts();
  const [paneOpen, setPaneOpen] = useState(false);
  const [toolsPaneOpen, setToolsPaneOpen] = useState(false);
  const { showBanner, showModal, setShowModal, openModal, dismissBanner, handleSave } = useSaveSession({
    messages, toolId: "information-architecture", toolPath: "/automate-ux/information-architecture", toolLabel: "Information Architecture", onRestored: setMessages,
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + "px";
    }
  }, [input]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("File size must be less than 2MB");
      return;
    }
    setUploadedFile(file);
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setDocumentContent(content);
    };
    reader.readAsText(file);
  };

  const removeFile = () => {
    setUploadedFile(null);
    setDocumentContent("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmitPrompt = () => {
    if (!input.trim() && !uploadedFile) return;
    checkGate(() => {
      setPendingPrompt(input.trim());
      setShowMethodModal(true);
    });
  };

  const handleMethodSelect = (method: UxMethodOption) => {
    setShowMethodModal(false);
    const enrichedPrompt = `[${method.label}] ${pendingPrompt}`;
    setInput("");
    setPendingPrompt("");
    savePrompt(enrichedPrompt, "information-architecture", "Information Architecture");
    sendMessageWithContent(enrichedPrompt);
  };

  const sendMessageWithContent = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: "",
    };
    setMessages((prev) => [...prev, assistantMessage]);

    try {
      const response = await fetch("/api/ux-automation/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "information-architecture",
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          documentContent: documentContent || undefined,
        }),
      });

      if (!response.ok) throw new Error("Failed to send message");

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No response body");

      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          try {
            const data = JSON.parse(line.slice(6));
            if (data.content) {
              setMessages((prev) => {
                const updated = [...prev];
                const lastMsg = updated[updated.length - 1];
                if (lastMsg.role === "assistant") {
                  lastMsg.content += data.content;
                }
                return updated;
              });
            }
          } catch {}
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => {
        const updated = [...prev];
        const lastMsg = updated[updated.length - 1];
        if (lastMsg.role === "assistant" && !lastMsg.content) {
          lastMsg.content = "Sorry, I encountered an error. Please try again.";
        }
        return updated;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmitPrompt();
    }
  };

  return (
    <div className="h-screen bg-background flex flex-col">
      <header className="shrink-0 border-b border-border/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <Link href="/automate-ux">
                <Button variant="ghost" size="icon" className="h-8 w-8" data-testid="button-back">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
              <span className="font-semibold text-sm">Information Architecture</span>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 relative"
                onClick={() => setPaneOpen(true)}
                data-testid="button-open-saved-pane"
              >
                <LayoutList className="w-4 h-4" />
                {prompts.length > 0 && (
                  <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-primary" />
                )}
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {isLocked && lockedUntil && <LockoutScreen lockedUntil={lockedUntil} onUnlockNow={openGate} />}
      <main className="flex-1" style={{ display: isLocked ? "none" : undefined }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-180px)]">
              <div className="w-12 h-12 rounded-full bg-foreground flex items-center justify-center mb-6">
                <GitBranch className="w-6 h-6 text-background" />
              </div>
              <h1 className="text-2xl font-semibold mb-2" data-testid="text-ia-title">
                How can I help with IA?
              </h1>
              <p className="text-muted-foreground text-center max-w-md mb-8 text-sm" data-testid="text-ia-description">
                I can help you create site maps, design navigation structures, and plan content strategy.
              </p>
              <div className="grid grid-cols-2 gap-2 w-full max-w-md">
                {[
                  "Create a site map for my app",
                  "Design the navigation structure",
                  "Conduct a content audit",
                  "Plan a content strategy"
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    className="text-left text-sm px-3.5 py-2.5 rounded-xl border border-border/60 text-muted-foreground hover:bg-muted/50 transition-colors"
                    onClick={() => setInput(suggestion)}
                    data-testid={`button-suggestion-${suggestion.slice(0, 20).replace(/\s+/g, '-').toLowerCase()}`}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="py-6 space-y-6">
              {messages.map((message, index) => (
                <div key={message.id} data-testid={`message-${message.role}-${message.id}`}>
                  <ChatMessage
                    role={message.role}
                    content={message.content}
                    isLoading={isLoading && index === messages.length - 1 && message.role === "assistant"}
                  />
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
        {messages.length === 0 && (
          <div className="flex justify-center pb-6">
            <button
              onClick={() => setToolsPaneOpen(true)}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-border text-muted-foreground hover:text-foreground hover:bg-muted hover:border-foreground/20 transition-all"
              data-testid="button-open-tools-panel"
            >
              <GitBranch className="w-3.5 h-3.5" />
              <span>Plan IA with AI</span>
            </button>
          </div>
        )}
      </main>

      <div className="shrink-0 pb-4 pt-2 px-4" style={{ display: isLocked ? "none" : undefined }}>
        <div className="max-w-3xl mx-auto">
          {uploadedFile && (
            <div className="flex items-center gap-2 mb-2 mx-1 px-3 py-1.5 bg-muted/60 rounded-lg w-fit">
              <FileText className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-xs truncate max-w-[200px]">{uploadedFile.name}</span>
              <button onClick={removeFile} className="p-0.5 hover:bg-muted rounded" data-testid="button-remove-file">
                <X className="w-3 h-3 text-muted-foreground" />
              </button>
            </div>
          )}
          <div className="relative flex items-end gap-2 rounded-2xl border border-border bg-muted/30 px-3 py-2 focus-within:border-border focus-within:ring-1 focus-within:ring-ring/20">
            <input
              ref={fileInputRef}
              type="file"
              accept=".txt,.md,.csv,.json"
              className="hidden"
              onChange={handleFileUpload}
              data-testid="input-file-upload"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
              className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground disabled:opacity-40 shrink-0 mb-0.5"
              data-testid="button-upload"
            >
              <Paperclip className="w-4 h-4" />
            </button>
            <textarea
              ref={textareaRef}
              placeholder="Message Information Architecture..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              rows={1}
              className="flex-1 bg-transparent resize-none text-sm leading-relaxed placeholder:text-muted-foreground/60 focus:outline-none disabled:opacity-50 py-1.5 max-h-[200px]"
              data-testid="input-message"
            />
            <button
              onClick={handleSubmitPrompt}
              disabled={isLoading || (!input.trim() && !uploadedFile)}
              className="p-1.5 rounded-lg bg-foreground text-background disabled:opacity-30 transition-opacity shrink-0 mb-0.5"
              data-testid="button-send"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <ArrowUp className="w-4 h-4" />
              )}
            </button>
          </div>
          <p className="text-[11px] text-muted-foreground/50 text-center mt-2">
            AI can make mistakes. Verify important information.
          </p>
        </div>
      </div>

      <AutomateGateModal
        open={showGate}
        onUnlocked={handleUnlocked}
        onDismissed={handleDismissed}
      />
      <MethodSelectorModal
        open={showMethodModal}
        onOpenChange={setShowMethodModal}
        title={workflowMethods.title}
        subtitle={workflowMethods.subtitle}
        methods={workflowMethods.methods}
        onSelect={handleMethodSelect}
        icon={GitBranch}
      />
      <WorkflowToolsPanel
        open={toolsPaneOpen}
        onClose={() => setToolsPaneOpen(false)}
        title="IA Tools"
        subtitle="Sitemaps & navigation validation"
        tools={IA_TOOLS}
        categories={IA_CATEGORIES}
        currentQuery={input.trim() || undefined}
      />
      {showBanner && <SaveSessionBanner onOpen={openModal} onDismiss={dismissBanner} />}
      <SaveSessionModal open={showModal} onClose={() => setShowModal(false)} onSave={handleSave} toolLabel="Information Architecture" />
    </div>
  );
}
