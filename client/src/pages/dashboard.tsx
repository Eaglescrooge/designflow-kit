import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeToggle } from "@/components/theme-toggle";
import { preKitTools, postKitTools } from "@/lib/data";
import { 
  Box, 
  ArrowLeft, 
  CheckCircle2, 
  Circle, 
  Rocket,
  ClipboardList,
  TrendingUp
} from "lucide-react";

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  phase: "pre" | "post";
}

function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  };

  return [storedValue, setValue];
}

export default function Dashboard() {
  const initialItems: ChecklistItem[] = [
    ...preKitTools.map(tool => ({
      id: tool.id,
      title: tool.title,
      description: tool.description,
      completed: false,
      phase: "pre" as const
    })),
    ...postKitTools.map(tool => ({
      id: tool.id,
      title: tool.title,
      description: tool.description,
      completed: false,
      phase: "post" as const
    }))
  ];

  const [checklist, setChecklist] = useLocalStorage<ChecklistItem[]>("designflow-checklist", initialItems);

  // Ensure all items exist (in case new tools are added)
  useEffect(() => {
    const existingIds = new Set(checklist.map(item => item.id));
    const missingItems = initialItems.filter(item => !existingIds.has(item.id));
    if (missingItems.length > 0) {
      setChecklist([...checklist, ...missingItems]);
    }
  }, []);

  const toggleItem = (id: string) => {
    setChecklist(checklist.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const preItems = checklist.filter(item => item.phase === "pre");
  const postItems = checklist.filter(item => item.phase === "post");

  const preCompleted = preItems.filter(item => item.completed).length;
  const postCompleted = postItems.filter(item => item.completed).length;
  const totalCompleted = preCompleted + postCompleted;
  const totalItems = checklist.length;

  const preProgress = (preCompleted / preItems.length) * 100;
  const postProgress = (postCompleted / postItems.length) * 100;
  const overallProgress = (totalCompleted / totalItems) * 100;

  const resetChecklist = () => {
    setChecklist(initialItems);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 h-16">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="icon" data-testid="button-back-home">
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
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={resetChecklist} data-testid="button-reset-checklist">
                Reset Progress
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Overview Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card data-testid="card-overall-progress">
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCompleted}/{totalItems}</div>
              <Progress value={overallProgress} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">
                {Math.round(overallProgress)}% complete
              </p>
            </CardContent>
          </Card>

          <Card data-testid="card-prekit-progress">
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pre-Design Phase</CardTitle>
              <ClipboardList className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{preCompleted}/{preItems.length}</div>
              <Progress value={preProgress} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">
                Research to prototype
              </p>
            </CardContent>
          </Card>

          <Card data-testid="card-postkit-progress">
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Post-Design Phase</CardTitle>
              <Rocket className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{postCompleted}/{postItems.length}</div>
              <Progress value={postProgress} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">
                Testing to handover
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Checklist Tabs */}
        <Tabs defaultValue="pre" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="pre" data-testid="tab-predesign">
              Pre-Design ({preCompleted}/{preItems.length})
            </TabsTrigger>
            <TabsTrigger value="post" data-testid="tab-postdesign">
              Post-Design ({postCompleted}/{postItems.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pre" className="space-y-4">
            <div className="space-y-2">
              <h2 className="font-serif text-2xl font-bold">Pre-Design Checklist</h2>
              <p className="text-muted-foreground">
                Complete these deliverables before moving to high-fidelity design and development.
              </p>
            </div>
            <div className="grid gap-4">
              {preItems.map((item, index) => (
                <ChecklistCard 
                  key={item.id} 
                  item={item} 
                  index={index}
                  onToggle={() => toggleItem(item.id)} 
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="post" className="space-y-4">
            <div className="space-y-2">
              <h2 className="font-serif text-2xl font-bold">Post-Design Checklist</h2>
              <p className="text-muted-foreground">
                Complete these deliverables for successful design handover and production quality.
              </p>
            </div>
            <div className="grid gap-4">
              {postItems.map((item, index) => (
                <ChecklistCard 
                  key={item.id} 
                  item={item} 
                  index={index}
                  onToggle={() => toggleItem(item.id)} 
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Completion Message */}
        {overallProgress === 100 && (
          <Card className="mt-8 border-chart-2/50 bg-chart-2/10" data-testid="card-completion-message">
            <CardContent className="flex items-center gap-4 py-6">
              <CheckCircle2 className="w-10 h-10 text-chart-2" />
              <div>
                <h3 className="font-semibold text-lg">Congratulations!</h3>
                <p className="text-muted-foreground">
                  You've completed all design deliverables. Your project is ready for launch!
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}

interface ChecklistCardProps {
  item: ChecklistItem;
  index: number;
  onToggle: () => void;
}

function ChecklistCard({ item, index, onToggle }: ChecklistCardProps) {
  const tool = [...preKitTools, ...postKitTools].find(t => t.id === item.id);
  const Icon = tool?.icon || Circle;

  return (
    <Card 
      className={`transition-all ${item.completed ? 'bg-muted/50 border-chart-2/30' : ''}`}
      data-testid={`card-checklist-${item.id}`}
    >
      <CardContent className="flex items-start gap-4 py-4">
        <div className="pt-1">
          <Checkbox 
            checked={item.completed}
            onCheckedChange={onToggle}
            data-testid={`checkbox-${item.id}`}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <div className={`w-8 h-8 rounded-md flex items-center justify-center ${item.completed ? 'bg-chart-2/20' : 'bg-primary/10'}`}>
              <Icon className={`w-4 h-4 ${item.completed ? 'text-chart-2' : 'text-primary'}`} />
            </div>
            <h3 className={`font-semibold ${item.completed ? 'line-through text-muted-foreground' : ''}`}>
              {item.title}
            </h3>
            <Badge variant="outline" className="text-xs">
              Step {index + 1}
            </Badge>
            {item.completed && (
              <Badge variant="default" className="bg-chart-2 text-xs">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Complete
              </Badge>
            )}
          </div>
          <p className={`mt-2 text-sm ${item.completed ? 'text-muted-foreground/70' : 'text-muted-foreground'}`}>
            {item.description}
          </p>
          {tool?.integrations && (
            <div className="flex flex-wrap gap-2 mt-3">
              {tool.integrations.slice(0, 3).map(integration => (
                <Badge key={integration} variant="secondary" className="text-xs">
                  {integration}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
