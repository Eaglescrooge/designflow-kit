import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  X,
  Trash2,
  Clock,
  MessageSquare,
  Users,
  Map,
  TestTube,
  PenTool,
  GitBranch,
  Brain,
  Sparkles,
  ChevronRight,
  Inbox,
} from "lucide-react";
import type { SavedPrompt, DayGroup } from "@/hooks/use-saved-prompts";
import { DAY_GROUPS, getGroup } from "@/hooks/use-saved-prompts";

const TOOL_ICONS: Record<string, React.ElementType> = {
  "ux-research": Search,
  "personas": Users,
  "journey-maps": Map,
  "ux-testing": TestTube,
  "workshops": MessageSquare,
  "wireframes": PenTool,
  "information-architecture": GitBranch,
  "ai-analysis": Brain,
};

const TOOL_COLORS: Record<string, string> = {
  "ux-research": "text-blue-500 bg-blue-500/10",
  "personas": "text-purple-500 bg-purple-500/10",
  "journey-maps": "text-green-500 bg-green-500/10",
  "ux-testing": "text-orange-500 bg-orange-500/10",
  "workshops": "text-pink-500 bg-pink-500/10",
  "wireframes": "text-cyan-500 bg-cyan-500/10",
  "information-architecture": "text-amber-500 bg-amber-500/10",
  "ai-analysis": "text-indigo-500 bg-indigo-500/10",
};

interface SavedPromptsPaneProps {
  open: boolean;
  onClose: () => void;
  prompts: SavedPrompt[];
  onDelete: (id: string) => void;
  onClearAll: () => void;
  onSelectPrompt?: (prompt: SavedPrompt) => void;
  activeFilter?: DayGroup | "All";
}

export function SavedPromptsPane({
  open,
  onClose,
  prompts,
  onDelete,
  onClearAll,
  onSelectPrompt,
  activeFilter: externalFilter,
}: SavedPromptsPaneProps) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<DayGroup | "All">("All");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const activeFilter = externalFilter ?? filter;

  const filtered = useMemo(() => {
    return prompts.filter((p) => {
      const matchesSearch =
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.toolLabel.toLowerCase().includes(search.toLowerCase());
      const matchesFilter =
        activeFilter === "All" || getGroup(p.timestamp) === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [prompts, search, activeFilter]);

  const grouped = useMemo(() => {
    const map: Partial<Record<DayGroup, SavedPrompt[]>> = {};
    for (const p of filtered) {
      const g = getGroup(p.timestamp);
      if (!map[g]) map[g] = [];
      map[g]!.push(p);
    }
    return map;
  }, [filtered]);

  const groupsToShow = DAY_GROUPS.filter((g) => grouped[g]?.length);

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px] transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        data-testid="overlay-saved-pane"
      />

      <aside
        className={`fixed left-0 top-0 bottom-0 z-50 w-72 bg-background border-r border-border flex flex-col shadow-xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        data-testid="pane-saved-prompts"
      >
        <div className="flex items-center justify-between px-4 h-14 border-b border-border/50 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
            </div>
            <span className="font-semibold text-sm">Saved Prompts</span>
          </div>
          <button
            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-muted text-muted-foreground transition-colors"
            onClick={onClose}
            data-testid="button-close-saved-pane"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-3 pt-3 pb-2 shrink-0">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/60" />
            <Input
              placeholder="Search prompts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 h-8 text-sm rounded-full bg-muted/50 border-transparent focus:border-border"
              data-testid="input-search-prompts"
            />
            {search && (
              <button
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-muted-foreground"
                onClick={() => setSearch("")}
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        <div className="px-3 pb-2 shrink-0">
          <div className="flex gap-1 overflow-x-auto scrollbar-none">
            {(["All", ...DAY_GROUPS] as (DayGroup | "All")[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`whitespace-nowrap text-[11px] px-2.5 py-1 rounded-full font-medium transition-all ${
                  activeFilter === f
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
                data-testid={`filter-${f.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {f === "All" ? "All" : f}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-2">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3 text-center px-4">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <Inbox className="w-5 h-5 text-muted-foreground/60" />
              </div>
              <p className="text-sm text-muted-foreground/60">
                {search ? "No prompts match your search" : "No saved prompts yet"}
              </p>
              {search && (
                <button
                  className="text-xs text-primary hover:underline"
                  onClick={() => setSearch("")}
                >
                  Clear search
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-4 pb-4">
              {groupsToShow.map((group) => (
                <div key={group}>
                  <p className="text-[11px] font-medium text-muted-foreground/50 uppercase tracking-wider px-2 py-1.5">
                    {group}
                  </p>
                  <div className="space-y-0.5">
                    {grouped[group]!.map((prompt) => {
                      const Icon = TOOL_ICONS[prompt.toolType] ?? MessageSquare;
                      const color = TOOL_COLORS[prompt.toolType] ?? "text-muted-foreground bg-muted";
                      return (
                        <div
                          key={prompt.id}
                          className="group relative flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-muted/60 cursor-pointer transition-colors"
                          onMouseEnter={() => setHoveredId(prompt.id)}
                          onMouseLeave={() => setHoveredId(null)}
                          onClick={() => onSelectPrompt?.(prompt)}
                          data-testid={`saved-prompt-${prompt.id}`}
                        >
                          <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${color}`}>
                            <Icon className="w-3 h-3" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-foreground truncate leading-snug">{prompt.title}</p>
                            <p className="text-[10px] text-muted-foreground/50 truncate">{prompt.toolLabel}</p>
                          </div>
                          {hoveredId === prompt.id && (
                            <button
                              className="shrink-0 w-6 h-6 flex items-center justify-center rounded-md hover:bg-destructive/10 hover:text-destructive text-muted-foreground/40 transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                onDelete(prompt.id);
                              }}
                              data-testid={`button-delete-prompt-${prompt.id}`}
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {prompts.length > 0 && (
          <div className="shrink-0 px-3 py-3 border-t border-border/50">
            <button
              className="w-full flex items-center justify-center gap-1.5 text-xs text-muted-foreground/60 hover:text-destructive transition-colors py-1.5 rounded-lg hover:bg-destructive/5"
              onClick={onClearAll}
              data-testid="button-clear-all-prompts"
            >
              <Trash2 className="w-3 h-3" />
              Clear all history
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
