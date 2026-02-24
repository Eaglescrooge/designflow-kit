import { ChartRenderer, parseChartFromContent, type ChartData } from "./chart-renderer";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Bot, User, Copy, Check } from "lucide-react";
import { useState } from "react";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  isLoading?: boolean;
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 py-1" data-testid="typing-indicator">
      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:0ms]" />
      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:150ms]" />
      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:300ms]" />
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-muted"
      data-testid="button-copy-message"
    >
      {copied ? (
        <Check className="w-3.5 h-3.5 text-green-500" />
      ) : (
        <Copy className="w-3.5 h-3.5 text-muted-foreground" />
      )}
    </button>
  );
}

export function ChatMessage({ role, content, isLoading }: ChatMessageProps) {
  if (role === "user") {
    return (
      <div className="group flex gap-3 justify-end" data-testid="chat-message-user">
        <div className="flex flex-col items-end gap-1 max-w-[75%]">
          <div className="rounded-2xl rounded-br-md px-4 py-2.5 bg-primary text-primary-foreground">
            <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{content}</p>
          </div>
        </div>
        <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center shrink-0 mt-0.5">
          <User className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>
    );
  }

  const { text, charts } = parseChartFromContent(content);

  return (
    <div className="group flex gap-3" data-testid="chat-message-assistant">
      <div className="w-7 h-7 rounded-full bg-foreground flex items-center justify-center shrink-0 mt-0.5">
        <Bot className="w-4 h-4 text-background" />
      </div>
      <div className="flex-1 min-w-0 max-w-[85%]">
        {text ? (
          <div className="prose prose-sm dark:prose-invert max-w-none text-[15px] leading-relaxed prose-p:my-1.5 prose-ul:my-1.5 prose-ol:my-1.5 prose-li:my-0.5 prose-headings:my-2 prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-code:text-[13px] prose-code:before:content-none prose-code:after:content-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
          </div>
        ) : null}
        {!text && !charts.length && isLoading && <TypingIndicator />}
        {charts.map((chart, index) => (
          <ChartRenderer key={index} chart={chart} />
        ))}
        {text && (
          <div className="flex items-center gap-1 mt-1.5">
            <CopyButton text={text} />
          </div>
        )}
      </div>
    </div>
  );
}
