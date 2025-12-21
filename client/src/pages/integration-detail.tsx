import { useParams } from "wouter";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { getIntegrationById, integrationTools } from "@/lib/data";
import { 
  ArrowLeft, 
  Box, 
  ExternalLink,
  Play,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Layers
} from "lucide-react";

export default function IntegrationDetail() {
  const { id } = useParams<{ id: string }>();
  const integration = getIntegrationById(id || "");

  if (!integration) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Box className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-2">Integration Not Found</h1>
          <p className="text-muted-foreground mb-4">The integration you're looking for doesn't exist.</p>
          <Link href="/">
            <Button data-testid="button-back-home">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const currentIndex = integrationTools.findIndex(t => t.id === integration.id);
  const prevIntegration = currentIndex > 0 ? integrationTools[currentIndex - 1] : null;
  const nextIntegration = currentIndex < integrationTools.length - 1 ? integrationTools[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            <Link href="/">
              <Button variant="ghost" size="sm" data-testid="button-back-home">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Home
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-primary" />
              <span className="font-semibold">{integration.name}</span>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <Badge variant="secondary">{integration.category}</Badge>
            <span className="text-sm text-muted-foreground">
              Integration Tool
            </span>
          </div>
          <h1 className="font-heading text-4xl font-bold mb-4" data-testid="text-integration-title">
            {integration.name}
          </h1>
          <p className="text-xl text-muted-foreground">
            {integration.description}
          </p>
        </div>

        <section className="mb-10">
          <h2 className="font-heading text-2xl font-semibold mb-4">About {integration.name}</h2>
          <p className="text-muted-foreground leading-relaxed">
            {integration.detailedDescription}
          </p>
        </section>

        <section className="mb-10">
          <h2 className="font-heading text-2xl font-semibold mb-4">How to Use</h2>
          <div className="space-y-3">
            {integration.howToUse.map((step, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                </div>
                <p className="text-muted-foreground">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="font-heading text-2xl font-semibold mb-4">Video Tutorial</h2>
          <div className="aspect-video rounded-lg overflow-hidden border bg-muted">
            <iframe
              src={`https://www.youtube.com/embed/${integration.youtubeId}`}
              title={`${integration.name} Tutorial`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
              data-testid="video-tutorial"
            />
          </div>
        </section>

        <Card className="mb-10">
          <CardContent className="py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Play className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{integration.signupLabel}</h3>
                  <p className="text-sm text-muted-foreground">Start using {integration.name} for your projects</p>
                </div>
              </div>
              <a 
                href={integration.signupUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                data-testid="link-signup"
              >
                <Button>
                  Get Started
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>

        {integration.usedIn.length > 0 && (
          <section className="mb-10">
            <h2 className="font-heading text-2xl font-semibold mb-4">Used In</h2>
            <div className="flex flex-wrap gap-2">
              {integration.usedIn.map(toolName => (
                <Badge key={toolName} variant="outline">
                  {toolName}
                </Badge>
              ))}
            </div>
          </section>
        )}

        <div className="flex items-center justify-between gap-4 pt-6 border-t">
          {prevIntegration ? (
            <Link href={`/integration/${prevIntegration.id}`}>
              <Button variant="outline" data-testid="button-prev-integration">
                <ChevronLeft className="w-4 h-4 mr-2" />
                {prevIntegration.name}
              </Button>
            </Link>
          ) : (
            <div />
          )}
          {nextIntegration && (
            <Link href={`/integration/${nextIntegration.id}`}>
              <Button variant="outline" data-testid="button-next-integration">
                {nextIntegration.name}
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          )}
        </div>
      </main>
    </div>
  );
}
