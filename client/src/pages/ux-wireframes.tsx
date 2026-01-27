import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import { ArrowLeft, Send, Upload, X, FileText, PenTool, Loader2 } from "lucide-react";

interface Message { id: string; role: "user" | "assistant"; content: string; }

export default function UXWireframes() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [documentContent, setDocumentContent] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { alert("File size must be less than 2MB"); return; }
    setUploadedFile(file);
    const reader = new FileReader();
    reader.onload = (event) => setDocumentContent(event.target?.result as string);
    reader.readAsText(file);
  };

  const removeFile = () => { setUploadedFile(null); setDocumentContent(""); if (fileInputRef.current) fileInputRef.current.value = ""; };

  const sendMessage = async () => {
    if (!input.trim() && !uploadedFile) return;
    const userMessage: Message = { id: Date.now().toString(), role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), role: "assistant", content: "" }]);

    try {
      const response = await fetch("/api/ux-automation/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "wireframes", messages: [...messages, userMessage].map((m) => ({ role: m.role, content: m.content })), documentContent: documentContent || undefined }),
      });
      if (!response.ok) throw new Error("Failed");
      const reader = response.body?.getReader();
      if (!reader) throw new Error("No body");
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
            if (data.content) setMessages((prev) => { const updated = [...prev]; updated[updated.length - 1].content += data.content; return updated; });
          } catch {}
        }
      }
    } catch { setMessages((prev) => { const updated = [...prev]; if (updated[updated.length - 1].role === "assistant" && !updated[updated.length - 1].content) updated[updated.length - 1].content = "Sorry, I encountered an error."; return updated; }); }
    finally { setIsLoading(false); }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between gap-4 h-16">
            <div className="flex items-center gap-4">
              <Link href="/automate-ux"><Button variant="ghost" size="icon" data-testid="button-back"><ArrowLeft className="w-5 h-5" /></Button></Link>
              <div className="flex items-center gap-2"><PenTool className="w-5 h-5 text-cyan-500" /><span className="font-serif font-bold text-lg">Low Fidelity Wireframes</span></div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-4 sm:px-6 py-6">
        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-6"><PenTool className="w-8 h-8 text-cyan-500" /></div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold mb-4" data-testid="text-wireframes-title">What do you want to wireframe?</h1>
            <p className="text-muted-foreground max-w-md mb-8">I can help you create quick sketches, paper prototypes, digital wireframes, and rapid prototypes.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
              {["Wireframe a mobile app screen", "Create a landing page layout", "Design a dashboard wireframe", "Sketch a checkout flow"].map((s) => (
                <Button key={s} variant="outline" className="text-left justify-start h-auto py-3 px-4 whitespace-normal" onClick={() => setInput(s)}>{s}</Button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {messages.map((m) => (<div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}><div className={`max-w-[80%] rounded-2xl px-4 py-3 ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}><p className="whitespace-pre-wrap">{m.content || (isLoading ? "..." : "")}</p></div></div>))}
            <div ref={messagesEndRef} />
          </div>
        )}
        <div className="sticky bottom-0 bg-background pt-4">
          {uploadedFile && (<div className="flex items-center gap-2 mb-3 p-2 bg-muted rounded-lg"><FileText className="w-4 h-4 text-cyan-500" /><span className="text-sm flex-1 truncate">{uploadedFile.name}</span><span className="text-xs text-muted-foreground">{(uploadedFile.size / 1024).toFixed(1)} KB</span><Button variant="ghost" size="icon" className="h-6 w-6" onClick={removeFile}><X className="w-4 h-4" /></Button></div>)}
          <Card><CardContent className="p-2"><div className="flex items-center gap-2"><input ref={fileInputRef} type="file" accept=".txt,.md,.csv,.json" className="hidden" onChange={handleFileUpload} /><Button variant="ghost" size="icon" onClick={() => fileInputRef.current?.click()} disabled={isLoading}><Upload className="w-5 h-5" /></Button><Input placeholder="Describe what you want to wireframe..." value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }} disabled={isLoading} className="flex-1 border-0 focus-visible:ring-0" /><Button size="icon" onClick={sendMessage} disabled={isLoading || (!input.trim() && !uploadedFile)}>{isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}</Button></div><p className="text-xs text-muted-foreground text-center mt-2">Upload requirements (max 2MB)</p></CardContent></Card>
        </div>
      </main>
    </div>
  );
}
