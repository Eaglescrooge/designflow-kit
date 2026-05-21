import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, ExternalLink, LucideIcon } from "lucide-react";

export interface WorkflowTool {
  id: string;
  name: string;
  tagline: string;
  description: string;
  freeLabel: string;
  url: string;
  color: string;
  bg: string;
  emoji: string;
  category: string;
}

export interface WorkflowCategory {
  key: string;
  label: string;
  icon: LucideIcon;
}

interface WorkflowToolsPanelProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  tools: WorkflowTool[];
  categories: WorkflowCategory[];
  currentQuery?: string;
}

export function WorkflowToolsPanel({
  open, onClose, title, subtitle, tools, categories, currentQuery,
}: WorkflowToolsPanelProps) {
  return (
    <>
      {open && <div className="fixed inset-0 z-30 bg-black/10" onClick={onClose} />}
      <aside
        className={`fixed top-0 right-0 h-full w-80 z-40 bg-background border-l border-border shadow-xl flex flex-col transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        data-testid="panel-workflow-tools"
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
          <div>
            <p className="font-semibold text-sm">{title}</p>
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-muted transition-colors"
            data-testid="button-close-tools-panel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {currentQuery && (
          <div className="px-4 py-3 border-b border-border shrink-0">
            <p className="text-xs text-muted-foreground mb-2">Quick search with your query</p>
            <a
              href={`https://www.perplexity.ai/search?q=${encodeURIComponent(currentQuery)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="sm" variant="outline" className="w-full gap-2 text-xs justify-start" data-testid="button-search-perplexity">
                <span>🔍</span>
                <span className="truncate">Search: "{currentQuery.slice(0, 32)}{currentQuery.length > 32 ? "…" : ""}"</span>
                <ExternalLink className="w-3 h-3 ml-auto shrink-0" />
              </Button>
            </a>
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
          {categories.map(({ key, label, icon: Icon }) => {
            const catTools = tools.filter((t) => t.category === key);
            if (!catTools.length) return null;
            return (
              <div key={key}>
                <div className="flex items-center gap-1.5 mb-2.5">
                  <Icon className="w-3.5 h-3.5 text-muted-foreground" />
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
                </div>
                <div className="space-y-2">
                  {catTools.map((tool) => (
                    <div key={tool.id} className={`rounded-xl border p-3 ${tool.bg} transition-all`} data-testid={`card-tool-${tool.id}`}>
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-base leading-none">{tool.emoji}</span>
                          <div>
                            <p className={`text-sm font-semibold leading-tight ${tool.color}`}>{tool.name}</p>
                            <p className="text-[11px] text-muted-foreground leading-tight">{tool.tagline}</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0 shrink-0 h-4">{tool.freeLabel}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-2.5">{tool.description}</p>
                      <a href={tool.url} target="_blank" rel="noopener noreferrer">
                        <Button
                          size="sm"
                          variant="outline"
                          className={`w-full h-7 text-xs gap-1.5 ${tool.color} border-current/20 bg-background/60`}
                          data-testid={`button-open-${tool.id}`}
                        >
                          Open {tool.name}
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="px-4 py-3 border-t border-border shrink-0">
          <p className="text-[11px] text-muted-foreground/60 text-center">All tools have free plans. No affiliation.</p>
        </div>
      </aside>
    </>
  );
}
