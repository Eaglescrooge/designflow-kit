import { useState, useMemo } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { integrationTools } from "@/lib/data";
import {
  ArrowLeft,
  Box,
  Search,
  ExternalLink,
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
        tool.category.toLowerCase().includes(search.toLowerCase());
      const matchesCat =
        activeCategory === "All" || tool.category === activeCategory;
      return matchesSearch && matchesCat;
    });
  }, [search, activeCategory]);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="text-center mb-10">
          <Badge variant="outline" className="mb-3">41+ Integrations</Badge>
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-3" data-testid="text-integrations-heading">
            Connect with your favorite tools
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm">
            DesignFlow Kit integrates with the tools you already use — from design and research to project management and collaboration.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search integrations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring"
              data-testid="input-search-integrations"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-foreground text-background"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
              data-testid={`button-category-${cat.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <p className="text-xs text-muted-foreground mb-4">
          Showing {filtered.length} integration{filtered.length !== 1 ? "s" : ""}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((tool) => (
            <Link key={tool.id} href={`/integration/${tool.id}`}>
              <div
                className="group flex items-start gap-3 p-4 rounded-xl border border-border/60 hover:border-border hover:bg-muted/30 transition-all cursor-pointer"
                data-testid={`card-integration-${tool.id}`}
              >
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Box className="w-4 h-4 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-sm group-hover:text-primary transition-colors">
                    {tool.name}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{tool.category}</p>
                  <p className="text-xs text-muted-foreground/70 mt-1 line-clamp-2">
                    {tool.description}
                  </p>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-muted-foreground/30 group-hover:text-muted-foreground/60 shrink-0 mt-0.5 transition-colors" />
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No integrations found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
