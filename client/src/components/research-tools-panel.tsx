import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, ExternalLink, Sparkles, FlaskConical, BarChart3, Brain } from "lucide-react";

interface ResearchTool {
  id: string;
  name: string;
  tagline: string;
  description: string;
  freeLabel: string;
  url: string;
  color: string;
  bg: string;
  emoji: string;
  category: "ai" | "testing" | "analytics" | "repo";
}

const TOOLS: ResearchTool[] = [
  {
    id: "qoqo",
    name: "QoQo.ai",
    tagline: "AI persona & journey generator",
    description: "Generate user personas, journey maps, and design briefs in seconds. Figma plugin used by 95k+ designers.",
    freeLabel: "Free trial",
    url: "https://www.figma.com/community/plugin/1189158575928509194/QoQo",
    color: "text-violet-600",
    bg: "bg-violet-500/10 border-violet-500/20",
    emoji: "🧠",
    category: "ai",
  },
  {
    id: "perplexity",
    name: "Perplexity AI",
    tagline: "AI-powered research assistant",
    description: "Ask anything and get cited, up-to-date answers. Perfect for competitor research, market analysis, and desk research.",
    freeLabel: "Free plan",
    url: "https://www.perplexity.ai",
    color: "text-teal-600",
    bg: "bg-teal-500/10 border-teal-500/20",
    emoji: "🔍",
    category: "ai",
  },
  {
    id: "maze",
    name: "Maze",
    tagline: "Rapid usability testing",
    description: "Test prototypes with real users, tree testing, card sorting, and surveys. Get results in hours, not weeks.",
    freeLabel: "Free — 1 study/mo",
    url: "https://maze.co",
    color: "text-orange-600",
    bg: "bg-orange-500/10 border-orange-500/20",
    emoji: "🧩",
    category: "testing",
  },
  {
    id: "hotjar",
    name: "Hotjar",
    tagline: "Heatmaps & session recordings",
    description: "See where users click, scroll, and drop off. Collect feedback with surveys and polls directly on your product.",
    freeLabel: "Free plan",
    url: "https://www.hotjar.com",
    color: "text-red-600",
    bg: "bg-red-500/10 border-red-500/20",
    emoji: "🔥",
    category: "analytics",
  },
  {
    id: "lookback",
    name: "Lookback",
    tagline: "User interview & session capture",
    description: "Run moderated and unmoderated user sessions. Capture screen, voice, and face simultaneously.",
    freeLabel: "Free trial",
    url: "https://lookback.com",
    color: "text-blue-600",
    bg: "bg-blue-500/10 border-blue-500/20",
    emoji: "🎙️",
    category: "testing",
  },
  {
    id: "optimal",
    name: "Optimal Workshop",
    tagline: "IA & card sorting",
    description: "Tree testing, card sorting, and first-click testing to validate your information architecture and navigation.",
    freeLabel: "Free plan",
    url: "https://www.optimalworkshop.com",
    color: "text-green-600",
    bg: "bg-green-500/10 border-green-500/20",
    emoji: "🗂️",
    category: "testing",
  },
  {
    id: "dovetail",
    name: "Dovetail",
    tagline: "Research repository & insights",
    description: "Organise interview notes, tag insights, and surface patterns across all your research in one place.",
    freeLabel: "Free plan",
    url: "https://dovetail.com",
    color: "text-pink-600",
    bg: "bg-pink-500/10 border-pink-500/20",
    emoji: "📂",
    category: "repo",
  },
  {
    id: "userinterview",
    name: "User Interviews",
    tagline: "Participant recruitment",
    description: "Find research participants from a panel of 3M+ people. Filter by demographics, profession, and behaviour.",
    freeLabel: "Pay-per-participant",
    url: "https://www.userinterviews.com",
    color: "text-amber-600",
    bg: "bg-amber-500/10 border-amber-500/20",
    emoji: "👥",
    category: "testing",
  },
];

const CATEGORIES = [
  { key: "ai",       label: "AI Tools",      icon: Brain },
  { key: "testing",  label: "Testing",        icon: FlaskConical },
  { key: "analytics",label: "Analytics",     icon: BarChart3 },
  { key: "repo",     label: "Repository",    icon: Sparkles },
] as const;

interface ResearchToolsPanelProps {
  open: boolean;
  onClose: () => void;
  currentQuery?: string;
}

export function ResearchToolsPanel({ open, onClose, currentQuery }: ResearchToolsPanelProps) {
  const perplexityUrl = currentQuery
    ? `https://www.perplexity.ai/search?q=${encodeURIComponent(currentQuery)}`
    : "https://www.perplexity.ai";

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/10"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 right-0 h-full w-80 z-40 bg-background border-l border-border shadow-xl flex flex-col transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        data-testid="panel-research-tools"
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
          <div>
            <p className="font-semibold text-sm">Research Tools</p>
            <p className="text-xs text-muted-foreground">AI-powered tools on free plans</p>
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
            <a href={perplexityUrl} target="_blank" rel="noopener noreferrer">
              <Button size="sm" variant="outline" className="w-full gap-2 text-xs justify-start" data-testid="button-search-perplexity">
                <span>🔍</span>
                <span className="truncate">Search: "{currentQuery.slice(0, 32)}{currentQuery.length > 32 ? "…" : ""}"</span>
                <ExternalLink className="w-3 h-3 ml-auto shrink-0" />
              </Button>
            </a>
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
          {CATEGORIES.map(({ key, label, icon: Icon }) => {
            const tools = TOOLS.filter((t) => t.category === key);
            if (!tools.length) return null;
            return (
              <div key={key}>
                <div className="flex items-center gap-1.5 mb-2.5">
                  <Icon className="w-3.5 h-3.5 text-muted-foreground" />
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
                </div>
                <div className="space-y-2">
                  {tools.map((tool) => (
                    <div
                      key={tool.id}
                      className={`rounded-xl border p-3 ${tool.bg} transition-all`}
                      data-testid={`card-tool-${tool.id}`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-base leading-none">{tool.emoji}</span>
                          <div>
                            <p className={`text-sm font-semibold leading-tight ${tool.color}`}>{tool.name}</p>
                            <p className="text-[11px] text-muted-foreground leading-tight">{tool.tagline}</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0 shrink-0 h-4">
                          {tool.freeLabel}
                        </Badge>
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
          <p className="text-[11px] text-muted-foreground/60 text-center">
            All tools have free plans. No affiliation.
          </p>
        </div>
      </aside>
    </>
  );
}
