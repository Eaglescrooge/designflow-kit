import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, Book, Code, Users, Puzzle, Sparkles, GitPullRequest, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

const docSections = [
  {
    id: "overview",
    title: "Overview",
    icon: Book,
    content: `
# DesignFlow Kit

An open-source UX/Product Design toolkit that streamlines your entire design workflow from pre-design research to post-launch testing.

## What is DesignFlow Kit?

DesignFlow Kit provides designers with a comprehensive, integrated system covering:

- **Pre-Design Phase**: Research tools, persona creation, journey mapping, wireframing, and prototyping
- **Post-Design Phase**: Design reviews, developer handover, sprint management, usability testing, and documentation
- **41+ Integrations**: Connect with popular design tools like Figma, Miro, Notion, and more
- **30 AI Automation Tools**: Leverage AI-powered workflows and custom GPTs for faster design

## Key Features

### Interactive Dashboard
Track your design deliverables across both pre-design and post-design phases. Progress is automatically saved to your browser's local storage.

### Pre-Design Kit (10 Tools)
- Research Tools - Structured templates for user research
- Synthesize Data - Transform research into insights
- Create Personas - Data-driven persona creation
- Journey Maps - Visualize user experiences
- Lo-Fi Wireframes - Rapid concept validation
- UX Testing - Validate early designs
- Workshop Tools - Card sorting and ideation
- Design System - Build component libraries
- Hi-Fi Wireframes - Production-ready designs
- UX Prototype - Interactive prototyping

### Post-Design Kit (7 Tools)
- Design Review - Structured feedback collection
- Design Shipping - Asset management and versioning
- Dev Handover - Seamless design-to-development
- Sprint Board - Agile design management
- Usability Testing - A/B testing and analytics
- Process Docs - Documentation automation
- Metrics Dashboard - Track design impact
    `
  },
  {
    id: "user-guide",
    title: "User Guide",
    icon: Users,
    content: `
# User Guide

Welcome to DesignFlow Kit! This guide will help you navigate the application.

## Getting Started

DesignFlow Kit organizes your design process into two main phases:

- **Pre-Design Phase**: Research, ideation, wireframing, and prototyping
- **Post-Design Phase**: Reviews, handover, testing, and documentation

## Using the Dashboard

The dashboard is your central hub for tracking design deliverables.

### Accessing the Dashboard
1. Click **"Get Started"** from the landing page
2. Or navigate directly to /dashboard

### Dashboard Actions
| Action | Description |
|--------|-------------|
| Toggle Completion | Click a tool card to mark it complete/incomplete |
| View Details | Click tool title to see full details |
| Track Progress | Progress bars show completion percentage |
| Reset Progress | Use reset button to clear all progress |

## Tracking Progress

### How Progress Works
1. Each tool represents a deliverable in your design process
2. Click a tool to toggle its completion status
3. Progress is calculated per phase and overall
4. Visual indicators show completed vs. pending items

### Progress Indicators
- **Progress Bar**: Shows percentage complete for each phase
- **Completion Count**: Displays "X of Y completed"
- **Visual Checkmarks**: Completed items show a checkmark

## Exploring Tool Details

Each tool has a dedicated detail page with:
- Detailed overview description
- Step-by-step usage guide
- Embedded YouTube tutorial
- Links to sign up for related services
- Related integrations

## Data Persistence

Your progress is saved automatically to your browser's local storage:
- No account required
- Data stays on your device
- Changes are saved immediately

**Note**: Data is browser-specific and won't sync across devices.
    `
  },
  {
    id: "developer-guide",
    title: "Developer Guide",
    icon: Code,
    content: `
# Developer Guide

Technical guide for contributing to DesignFlow Kit.

## Architecture Overview

DesignFlow Kit is a client-side React application with static data:

\`\`\`
┌─────────────────────────────────────────────────────┐
│                    Frontend                          │
│  React 18 + TypeScript + Tailwind CSS + shadcn/ui   │
│  └─ Routing: Wouter                                  │
│  └─ Data: Static TypeScript (client/src/lib/data.ts)│
│  └─ Persistence: Browser localStorage               │
└─────────────────────────────────────────────────────┘
\`\`\`

## Key Technologies

| Technology | Purpose |
|------------|---------|
| React 18 | UI framework |
| Wouter | Lightweight client routing |
| TanStack Query | Data fetching patterns |
| Tailwind CSS | Utility-first CSS |
| shadcn/ui | Accessible component library |
| Vite | Fast development and builds |

## Project Structure

\`\`\`
designflow-kit/
├── client/                     # React application
│   ├── src/
│   │   ├── components/         # UI components
│   │   │   └── ui/             # shadcn/ui components
│   │   ├── pages/              # Route components
│   │   ├── hooks/              # Custom React hooks
│   │   └── lib/                # Utilities and data
│   │       └── data.ts         # Main data source
├── docs/                       # Documentation
└── package.json
\`\`\`

## Data Models

### Tool Interface
\`\`\`typescript
interface Tool {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  integrations: string[];
  phase: "pre" | "post";
  detailedDescription: string;
  howToUse: string[];
  youtubeId: string;
  signupUrl: string;
  signupLabel: string;
}
\`\`\`

### Integration Interface
\`\`\`typescript
interface Integration {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  features: string[];
  apiDocs: ApiDocs;
}
\`\`\`

## Adding New Tools

1. Open \`client/src/lib/data.ts\`
2. Add to \`preKitTools\` or \`postKitTools\` array
3. Import icon from \`lucide-react\`
4. Test on dashboard and tool detail page

## Adding Integrations

1. Open \`client/src/lib/data.ts\`
2. Add to \`integrations\` array
3. Include API documentation structure
4. Test on integration detail page
    `
  },
  {
    id: "integrations",
    title: "Integrations",
    icon: Puzzle,
    content: `
# Integrations

DesignFlow Kit integrates with 41+ popular design and productivity tools.

## Design Tools
| Integration | Description |
|-------------|-------------|
| **Figma** | Collaborative design platform |
| **Sketch** | Vector design tool for Mac |
| **Adobe XD** | UI/UX design and prototyping |
| **Framer** | Interactive design tool |
| **Canva** | Graphic design platform |
| **InVision** | Digital product design platform |

## Research & Analytics
| Integration | Description |
|-------------|-------------|
| **Typeform** | Conversational forms |
| **UserTesting** | User research platform |
| **Hotjar** | Behavior analytics |
| **Maze** | Rapid testing platform |
| **Lookback** | User research platform |
| **Optimal Workshop** | Information architecture |
| **Dovetail** | Research repository |

## Collaboration
| Integration | Description |
|-------------|-------------|
| **Miro** | Online whiteboard |
| **Notion** | All-in-one workspace |
| **Mural** | Visual collaboration |
| **Airtable** | Spreadsheet-database hybrid |
| **Coda** | Interactive documents |

## Project Management
| Integration | Description |
|-------------|-------------|
| **Jira** | Agile project management |
| **Trello** | Kanban boards |
| **Asana** | Work management |
| **Linear** | Issue tracking |
| **Monday** | Work OS |

## Development & Handover
| Integration | Description |
|-------------|-------------|
| **Zeplin** | Design handoff |
| **GitHub** | Code hosting |
| **Abstract** | Version control for design |
| **Storybook** | UI component explorer |

## Documentation
| Integration | Description |
|-------------|-------------|
| **Zeroheight** | Design system documentation |
| **Confluence** | Team documentation |
| **Loom** | Video messaging |

## Communication
| Integration | Description |
|-------------|-------------|
| **Slack** | Team messaging |
| **Zoom** | Video conferencing |
| **Discord** | Community platform |
| **Calendly** | Scheduling |

## Prototyping
| Integration | Description |
|-------------|-------------|
| **ProtoPie** | Advanced prototyping |
| **Principle** | Animation design |
| **Origami** | Facebook's design tool |
| **Rive** | Interactive animations |
    `
  },
  {
    id: "ux-automation",
    title: "UX Automation",
    icon: Sparkles,
    content: `
# UX Automation Tools

30 AI-powered design tools organized into 7 categories.

## Custom GPTs
Design-focused GPTs built on ChatGPT:
- **Designer GPT** - Generate UI mockups from descriptions
- **UX Researcher GPT** - Analyze research data
- **Wireframe GPT** - Create wireframe layouts
- **Claude** - Anthropic's AI assistant
- **Perplexity** - AI-powered research
- **Copy.ai** - AI copywriting
- **Jasper** - AI writing assistant
- **Writer** - Enterprise AI writing

## Wireframing
AI tools for rapid wireframe creation:
- **Relume** - AI site builder with wireframe generation
- **Uizard** - AI-powered wireframe and mockup tool
- **Visily** - AI wireframe generator

## UI Generation
AI tools that generate complete UI designs:
- **v0 by Vercel** - AI UI generator with React code
- **Galileo AI** - Text-to-UI design generation
- **Khroma** - AI color palette generator
- **Fontjoy** - AI font pairing
- **Huemint** - AI color scheme generator
- **Brandmark** - AI logo generator
- **Looka** - AI brand identity platform

## Prototyping & Code
AI tools for design-to-code:
- **Locofy** - Design-to-code platform
- **Anima** - Figma to React/Vue/HTML
- **TeleportHQ** - AI website builder
- **Builder.io** - Visual development platform
- **Framer** - Design and publish websites

## Research & Testing
AI tools for user research:
- **QoQo.ai** - AI research assistant
- **Synthetic Users** - AI-generated user research
- **Attention Insight** - AI attention heatmaps

## Design Systems
AI tools for design system management:
- **Tokens Studio** - Design token management
- **Supernova** - Design system platform
- **Specify** - Design data platform

## Copywriting
AI tools for UX writing:
- **Writer** - Enterprise AI writing
- **Jasper** - AI content platform

## GPT Badge
Tools marked with a **GPT** badge require ChatGPT Plus subscription.
    `
  },
  {
    id: "contributing",
    title: "Contributing",
    icon: GitPullRequest,
    content: `
# Contributing

Thank you for your interest in contributing to DesignFlow Kit!

## Ways to Contribute

| Type | Description |
|------|-------------|
| Bug Reports | Report issues you encounter |
| Feature Requests | Suggest new features |
| Documentation | Improve docs, fix typos |
| Code | Fix bugs, add features |
| Design | Improve UI/UX |

## Development Setup

### Prerequisites
- Node.js 18 or higher
- npm or yarn
- Git

### Clone and Install
\`\`\`bash
git clone https://github.com/Eaglescrooge/designflow-kit.git
cd designflow-kit
npm install
npm run dev
\`\`\`

## Making Contributions

### Workflow
1. **Fork** the repository
2. **Clone** your fork locally
3. **Create a branch** for your changes
4. **Make changes** and test locally
5. **Commit** with clear messages
6. **Push** to your fork
7. **Open a Pull Request**

### Branch Naming
\`\`\`
feature/add-new-tool-name
fix/dashboard-progress-bug
docs/update-readme
\`\`\`

## Adding New Tools

1. Open \`client/src/lib/data.ts\`
2. Add to the appropriate array
3. Import icon from \`lucide-react\`
4. Test your changes

## Adding Integrations

1. Open \`client/src/lib/data.ts\`
2. Add to the \`integrations\` array
3. Include API documentation structure
4. Test on integration detail page

## Coding Guidelines

- Use TypeScript for all new code
- Use functional components with hooks
- Add \`data-testid\` attributes for testing
- Use Tailwind CSS utility classes
- Support dark mode

## Getting Help

- GitHub Discussions for questions
- GitHub Issues for bugs/features
- Discord Community for real-time help
    `
  }
];

function MarkdownContent({ content }: { content: string }) {
  const lines = content.trim().split('\n');
  
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      {lines.map((line, index) => {
        const trimmedLine = line.trim();
        
        if (trimmedLine.startsWith('# ')) {
          return (
            <h1 key={index} className="text-3xl font-serif font-bold mb-6 mt-8 first:mt-0">
              {trimmedLine.slice(2)}
            </h1>
          );
        }
        
        if (trimmedLine.startsWith('## ')) {
          return (
            <h2 key={index} className="text-2xl font-serif font-bold mb-4 mt-8 border-b pb-2">
              {trimmedLine.slice(3)}
            </h2>
          );
        }
        
        if (trimmedLine.startsWith('### ')) {
          return (
            <h3 key={index} className="text-xl font-semibold mb-3 mt-6">
              {trimmedLine.slice(4)}
            </h3>
          );
        }
        
        if (trimmedLine.startsWith('```')) {
          return null;
        }
        
        if (trimmedLine.startsWith('- **')) {
          const match = trimmedLine.match(/^- \*\*(.+?)\*\*\s*[-–]?\s*(.*)$/);
          if (match) {
            return (
              <div key={index} className="flex gap-2 mb-2 ml-4">
                <span className="text-primary">•</span>
                <span><strong className="font-semibold">{match[1]}</strong> - {match[2]}</span>
              </div>
            );
          }
        }
        
        if (trimmedLine.startsWith('- ')) {
          return (
            <div key={index} className="flex gap-2 mb-2 ml-4">
              <span className="text-primary">•</span>
              <span>{trimmedLine.slice(2)}</span>
            </div>
          );
        }
        
        if (trimmedLine.startsWith('|') && trimmedLine.endsWith('|')) {
          const cells = trimmedLine.split('|').filter(c => c.trim());
          const isHeader = lines[index + 1]?.includes('---');
          const isSeparator = trimmedLine.includes('---');
          
          if (isSeparator) return null;
          
          return (
            <div 
              key={index} 
              className={`grid gap-4 py-2 px-3 ${isHeader ? 'bg-muted font-semibold rounded-t-md' : 'border-b'}`}
              style={{ gridTemplateColumns: `repeat(${cells.length}, 1fr)` }}
            >
              {cells.map((cell, cellIndex) => (
                <span key={cellIndex} className="text-sm">
                  {cell.trim().replace(/\*\*/g, '')}
                </span>
              ))}
            </div>
          );
        }
        
        if (trimmedLine.startsWith('1. ') || /^\d+\.\s/.test(trimmedLine)) {
          const match = trimmedLine.match(/^(\d+)\.\s(.+)$/);
          if (match) {
            return (
              <div key={index} className="flex gap-3 mb-2 ml-4">
                <span className="text-primary font-medium">{match[1]}.</span>
                <span>{match[2]}</span>
              </div>
            );
          }
        }
        
        if (trimmedLine.startsWith('**Note**:') || trimmedLine.startsWith('> ')) {
          return (
            <div key={index} className="bg-muted/50 border-l-4 border-primary p-4 my-4 rounded-r-md">
              <p className="text-sm text-muted-foreground">{trimmedLine.replace(/^\*\*Note\*\*:\s*/, '').replace(/^>\s*/, '')}</p>
            </div>
          );
        }
        
        if (trimmedLine && !trimmedLine.startsWith('`')) {
          return (
            <p key={index} className="mb-4 leading-relaxed">
              {trimmedLine}
            </p>
          );
        }
        
        return null;
      })}
    </div>
  );
}

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("overview");
  
  const currentSection = docSections.find(s => s.id === activeSection) || docSections[0];
  
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon" data-testid="button-back-home">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Book className="w-5 h-5 text-primary" />
              <h1 className="text-xl font-serif font-bold">Documentation</h1>
            </div>
          </div>
          <Badge variant="outline">v1.0</Badge>
        </div>
      </header>
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          <aside className="hidden lg:block">
            <Card className="sticky top-24">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Documentation
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="flex flex-col">
                  {docSections.map((section) => {
                    const Icon = section.icon;
                    const isActive = activeSection === section.id;
                    return (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                          isActive 
                            ? 'bg-primary/10 text-primary border-r-2 border-primary' 
                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        }`}
                        data-testid={`nav-${section.id}`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-sm font-medium">{section.title}</span>
                        {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                      </button>
                    );
                  })}
                </nav>
              </CardContent>
            </Card>
          </aside>
          
          <div className="lg:hidden mb-6">
            <Tabs value={activeSection} onValueChange={setActiveSection}>
              <ScrollArea className="w-full">
                <TabsList className="w-full justify-start">
                  {docSections.map((section) => (
                    <TabsTrigger 
                      key={section.id} 
                      value={section.id}
                      className="text-xs"
                      data-testid={`tab-${section.id}`}
                    >
                      {section.title}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </ScrollArea>
            </Tabs>
          </div>
          
          <main className="min-w-0">
            <Card>
              <CardContent className="p-6 lg:p-8">
                <MarkdownContent content={currentSection.content} />
              </CardContent>
            </Card>
            
            <div className="mt-6 flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => {
                  const currentIndex = docSections.findIndex(s => s.id === activeSection);
                  if (currentIndex > 0) {
                    setActiveSection(docSections[currentIndex - 1].id);
                  }
                }}
                disabled={activeSection === docSections[0].id}
                data-testid="button-prev-section"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  const currentIndex = docSections.findIndex(s => s.id === activeSection);
                  if (currentIndex < docSections.length - 1) {
                    setActiveSection(docSections[currentIndex + 1].id);
                  }
                }}
                disabled={activeSection === docSections[docSections.length - 1].id}
                data-testid="button-next-section"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
