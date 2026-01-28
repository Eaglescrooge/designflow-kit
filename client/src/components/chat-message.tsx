import { ChartRenderer, parseChartFromContent, type ChartData } from "./chart-renderer";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  isLoading?: boolean;
}

export function ChatMessage({ role, content, isLoading }: ChatMessageProps) {
  if (role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] rounded-2xl px-4 py-3 bg-primary text-primary-foreground">
          <p className="whitespace-pre-wrap">{content}</p>
        </div>
      </div>
    );
  }

  const { text, charts } = parseChartFromContent(content);

  return (
    <div className="flex justify-start">
      <div className="max-w-[85%]">
        {text && (
          <div className="rounded-2xl px-4 py-3 bg-muted">
            <p className="whitespace-pre-wrap">{text || (isLoading ? "..." : "")}</p>
          </div>
        )}
        {!text && !charts.length && isLoading && (
          <div className="rounded-2xl px-4 py-3 bg-muted">
            <p>...</p>
          </div>
        )}
        {charts.map((chart, index) => (
          <ChartRenderer key={index} chart={chart} />
        ))}
      </div>
    </div>
  );
}
