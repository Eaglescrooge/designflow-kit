import { useState, useMemo } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { integrationTools } from "@/lib/data";
import {
  ArrowLeft,
  Search,
  ArrowRight,
} from "lucide-react";

export default function Integrations() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(() => {
    const cats = new Set(integrationTools.map((t) => t.category));
    return ["All", ...Array.from(cats).sort()];
  }, []);

  const filtered = useMemo(() => {
    return integrationTools.filter((tool) => {
      const matchesSearch =
        !search ||
        tool.name.toLowerCase().includes(search.toLowerCase()) ||
        tool.category.toLowerCase().includes(search.toLowerCase()) ||
        tool.description.toLowerCase().includes(search.toLowerCase());
      const matchesCat =
        activeCategory === "All" || tool.category === activeCategory;
      return matchesSearch && matchesCat;
    });
  }, [search, activeCategory]);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button variant="ghost" size="icon" className="h-8 w-8" data-testid="button-back-home">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
              <span className="font-semibold text-sm">All Integrations</span>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="text-center mb-10">
          <Badge variant="outline" className="mb-4">41+ Integrations</Badge>
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-3" data-testid="text-integrations-heading">
            Connect with your favorite tools
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto text-sm leading-relaxed">
            DesignFlow Kit integrates with the tools you already use &mdash; from design and
            research to project management and collaboration.
          </p>
        </div>

        <div className="relative max-w-sm mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
          <input
            type="text"
            placeholder="Search integrations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-full border border-border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring/30 placeholder:text-muted-foreground/50"
            data-testid="input-search-integrations"
          />
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
                activeCategory === cat
                  ? "bg-foreground text-background border-foreground"
                  : "bg-transparent text-muted-foreground border-border hover:border-foreground/30 hover:text-foreground"
              }`}
              data-testid={`button-category-${cat.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <p className="text-xs text-muted-foreground mb-5">
          {filtered.length} integration{filtered.length !== 1 ? "s" : ""}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border/40 border border-border/40 rounded-xl overflow-hidden">
          {filtered.map((tool) => (
            <Link key={tool.id} href={`/integration/${tool.id}`}>
              <div
                className="group bg-background p-5 hover:bg-muted/30 transition-colors cursor-pointer h-full"
                data-testid={`card-integration-${tool.id}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-xs font-semibold text-muted-foreground">
                    {tool.name.charAt(0)}
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/0 group-hover:text-muted-foreground/60 transition-all" />
                </div>
                <p className="font-medium text-sm mt-3" data-testid={`text-integration-name-${tool.id}`}>
                  {tool.name}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{tool.category}</p>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-sm text-muted-foreground">No integrations found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
