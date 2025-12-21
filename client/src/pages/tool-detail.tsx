import { Link, useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { getToolById, allTools } from "@/lib/data";
import { 
  ArrowLeft, 
  Box, 
  ExternalLink,
  Play,
  CheckCircle2,
  ChevronRight
} from "lucide-react";

export default function ToolDetail() {
  const params = useParams<{ id: string }>();
  const tool = getToolById(params.id || "");

  if (!tool) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Tool not found</h1>
          <Link href="/dashboard">
            <Button data-testid="button-back-dashboard">Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  const Icon = tool.icon;
  const currentIndex = allTools.findIndex(t => t.id === tool.id);
  const prevTool = currentIndex > 0 ? allTools[currentIndex - 1] : null;
  const nextTool = currentIndex < allTools.length - 1 ? allTools[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 h-16">
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="icon" data-testid="button-back-dashboard">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
                  <Box className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-serif font-bold text-lg hidden sm:inline">DesignFlow</span>
              </Link>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 lg:px-8 py-8 lg:py-12">
        {/* Tool Header */}
        <div className="space-y-6 mb-10">
          <div className="flex items-center gap-2">
            <Badge variant={tool.phase === "pre" ? "default" : "secondary"}>
              {tool.phase === "pre" ? "Pre-Design" : "Post-Design"}
            </Badge>
            <Badge variant="outline">
              Step {currentIndex + 1} of {allTools.length}
            </Badge>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Icon className="w-8 h-8 text-primary" />
            </div>
            <div className="space-y-2">
              <h1 className="font-serif text-3xl lg:text-4xl font-bold tracking-tight" data-testid="text-tool-title">
                {tool.title}
              </h1>
              <p className="text-lg text-muted-foreground">
                {tool.description}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {tool.integrations.map((integration) => (
              <Badge key={integration} variant="outline" className="text-sm">
                {integration}
              </Badge>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <section className="space-y-4">
              <h2 className="font-serif text-xl font-semibold">About this tool</h2>
              <p className="text-muted-foreground leading-relaxed">
                {tool.detailedDescription}
              </p>
            </section>

            {/* How to Use Section */}
            <section className="space-y-4">
              <h2 className="font-serif text-xl font-semibold">How to use</h2>
              <ul className="space-y-3">
                {tool.howToUse.map((step, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-xs font-semibold text-primary">{index + 1}</span>
                    </div>
                    <span className="text-muted-foreground">{step}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Video Tutorial Section */}
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <Play className="w-5 h-5 text-primary" />
                <h2 className="font-serif text-xl font-semibold">Video Tutorial</h2>
              </div>
              <Card className="overflow-hidden">
                <div className="aspect-video">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${tool.youtubeId}`}
                    title={`${tool.title} Tutorial`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    data-testid="iframe-youtube-tutorial"
                  />
                </div>
              </Card>
            </section>
          </div>

          {/* Right Column - CTA & Navigation */}
          <div className="space-y-6">
            {/* Sign Up CTA */}
            <Card className="sticky top-24">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-semibold text-lg">Get started with {tool.title}</h3>
                <p className="text-sm text-muted-foreground">
                  Sign up for the recommended tool to start using this workflow in your projects.
                </p>
                <Button 
                  className="w-full gap-2" 
                  size="lg"
                  onClick={() => window.open(tool.signupUrl, '_blank')}
                  data-testid="button-signup-tool"
                >
                  {tool.signupLabel}
                  <ExternalLink className="w-4 h-4" />
                </Button>

                <div className="pt-4 border-t border-border space-y-3">
                  <p className="text-xs text-muted-foreground font-medium">Integrates with:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {tool.integrations.map((integration) => (
                      <Badge key={integration} variant="secondary" className="text-xs">
                        {integration}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Checklist */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="font-semibold">Quick Checklist</h3>
                <ul className="space-y-2">
                  {tool.howToUse.slice(0, 3).map((step, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-chart-2" />
                      <span className="line-clamp-1">{step}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/dashboard">
                  <Button variant="outline" className="w-full gap-2" size="sm" data-testid="button-view-full-checklist">
                    View Full Checklist
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Navigation Footer */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex items-center justify-between gap-4">
            {prevTool ? (
              <Link href={`/tool/${prevTool.id}`}>
                <Button variant="outline" className="gap-2" data-testid="button-prev-tool">
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">{prevTool.title}</span>
                  <span className="sm:hidden">Previous</span>
                </Button>
              </Link>
            ) : (
              <div />
            )}
            
            {nextTool ? (
              <Link href={`/tool/${nextTool.id}`}>
                <Button className="gap-2" data-testid="button-next-tool">
                  <span className="hidden sm:inline">{nextTool.title}</span>
                  <span className="sm:hidden">Next</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            ) : (
              <Link href="/dashboard">
                <Button className="gap-2" data-testid="button-complete-checklist">
                  Complete Checklist
                  <CheckCircle2 className="w-4 h-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
