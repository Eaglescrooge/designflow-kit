import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  ArrowLeft,
  Search,
  Users,
  Map,
  TestTube,
  MessageSquare,
  PenTool,
  GitBranch,
  Brain,
  Sparkles
} from "lucide-react";

const uxAutomationOptions = [
  {
    id: "ux-research",
    title: "UX Research",
    description: "Conduct user interviews, surveys, and competitive analysis",
    icon: Search,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    subOptions: ["User Interviews", "Surveys", "Competitive Analysis", "Usability Studies"]
  },
  {
    id: "personas",
    title: "Create Personas",
    description: "Build detailed user personas based on research data",
    icon: Users,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    subOptions: ["Demographic Profiles", "Behavioral Patterns", "Goals & Pain Points"]
  },
  {
    id: "journey-maps",
    title: "Journey Maps & Flow Charts",
    description: "Visualize user journeys, flow charts, and mind maps",
    icon: Map,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    subOptions: ["Customer Journey Maps", "User Flows", "Mind Mapping", "Service Blueprints"]
  },
  {
    id: "ux-testing",
    title: "UX Testing",
    description: "Run usability tests and gather user feedback",
    icon: TestTube,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    subOptions: ["A/B Testing", "Usability Testing", "Heuristic Evaluation", "Accessibility Audits"]
  },
  {
    id: "workshops",
    title: "Design Workshops",
    description: "Facilitate collaborative design thinking sessions",
    icon: MessageSquare,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    subOptions: ["Design Sprints", "Ideation Sessions", "Stakeholder Workshops", "Co-creation"]
  },
  {
    id: "wireframes",
    title: "Low Fidelity Wireframes",
    description: "Create quick wireframes and sketches for validation",
    icon: PenTool,
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
    subOptions: ["Sketches", "Paper Prototypes", "Digital Wireframes", "Rapid Prototyping"]
  },
  {
    id: "information-architecture",
    title: "Information Architecture",
    description: "Organize and structure content effectively",
    icon: GitBranch,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    subOptions: ["Site Maps", "Card Sorting", "Navigation Design", "Content Strategy"]
  },
  {
    id: "ai-analysis",
    title: "AI-Powered Analysis",
    description: "Leverage AI for pattern recognition and insights",
    icon: Brain,
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
    subOptions: ["Sentiment Analysis", "Pattern Recognition", "Predictive UX", "Auto-Insights"]
  }
];

export default function AutomateUX() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 h-16">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="icon" data-testid="button-back">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="font-serif font-bold text-lg">Automate UX</span>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold mb-4" data-testid="text-automate-title">
            What would you like to achieve?
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-automate-description">
            Select a UX automation workflow to get started with AI-powered design tools
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {uxAutomationOptions.map((option) => (
            <Card 
              key={option.id} 
              className="hover-elevate cursor-pointer transition-all"
              data-testid={`card-ux-option-${option.id}`}
            >
              <CardContent className="p-6">
                <div className="flex flex-col gap-4">
                  <div className={`w-14 h-14 rounded-xl ${option.bgColor} flex items-center justify-center`}>
                    <option.icon className={`w-7 h-7 ${option.color}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{option.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{option.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {option.subOptions.map((sub) => (
                        <Badge key={sub} variant="secondary" className="text-xs">
                          {sub}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
