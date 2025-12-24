# DesignFlow Kit Developer Guide

This guide covers the technical architecture, data models, and how to extend DesignFlow Kit.

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Project Structure](#project-structure)
3. [Data Models](#data-models)
4. [Frontend Development](#frontend-development)
5. [Backend Development](#backend-development)
6. [Styling and Theming](#styling-and-theming)
7. [Adding New Tools](#adding-new-tools)
8. [Adding Integrations](#adding-integrations)
9. [Testing](#testing)
10. [Build and Deployment](#build-and-deployment)

---

## Architecture Overview

DesignFlow Kit is a client-side React application with static data:

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend                              │
│  React 18 + TypeScript + Tailwind CSS + shadcn/ui           │
│  └─ Routing: Wouter                                          │
│  └─ Data: Static TypeScript (client/src/lib/data.ts)         │
│  └─ Persistence: Browser localStorage                        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     Build & Serve                            │
│  Vite (development) / Static hosting (production)            │
└─────────────────────────────────────────────────────────────┘
```

### Key Technologies

| Layer | Technology | Purpose |
|-------|------------|---------|
| Frontend | React 18 | UI framework |
| Routing | Wouter | Lightweight client routing |
| State | TanStack Query | Data fetching patterns |
| Styling | Tailwind CSS | Utility-first CSS |
| Components | shadcn/ui | Accessible component library |
| Data | Static TypeScript | Tool and integration data |
| Persistence | localStorage | User progress storage |
| Build | Vite | Fast development and builds |

---

## Project Structure

```
designflow-kit/
├── client/                     # React application
│   ├── src/
│   │   ├── components/         # UI components
│   │   │   └── ui/             # shadcn/ui components
│   │   ├── pages/              # Route components
│   │   │   ├── home.tsx        # Landing page
│   │   │   ├── dashboard.tsx   # User dashboard
│   │   │   ├── tool-detail.tsx # Tool detail pages
│   │   │   └── integration-detail.tsx
│   │   ├── hooks/              # Custom React hooks
│   │   │   └── use-toast.ts    # Toast notifications
│   │   └── lib/                # Utilities and data
│   │       ├── data.ts         # Tool and integration data (main data source)
│   │       ├── queryClient.ts  # React Query setup
│   │       └── utils.ts        # Helper functions
│   └── index.html
├── docs/                       # Documentation
└── package.json
```

> **Note**: All application data (tools, integrations, UX automation tools) is defined in `client/src/lib/data.ts`. User progress is stored in browser localStorage.

---

## Data Models

### Tool Interface

Located in `client/src/lib/data.ts`:

```typescript
interface Tool {
  id: string;              // Unique identifier
  title: string;           // Display name
  description: string;     // Short description
  icon: LucideIcon;        // Icon component
  integrations: string[];  // Related integration names
  phase: "pre" | "post";   // Design phase
  detailedDescription: string;
  howToUse: string[];      // Step-by-step guide
  youtubeId: string;       // YouTube video ID
  signupUrl: string;       // External signup link
  signupLabel: string;     // Button text
}
```

### Integration Interface

```typescript
interface Integration {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  features: string[];
  website: string;
  docsUrl: string;
  youtubeId: string;
  howToUse: string[];
  apiDocumentation: {
    baseUrl: string;
    authMethod: string;
    endpoints: Array<{
      method: string;
      path: string;
      description: string;
    }>;
  };
}
```

### UX Automation Tool Interface

```typescript
interface UXAutomationTool {
  id: string;
  name: string;
  description: string;
  url: string;
  category: "wireframing" | "ui-generation" | "prototyping" | 
            "research" | "testing" | "copywriting" | "gpt" | 
            "design-system";
  hasGPT: boolean;        // Shows GPT badge
}
```

---

## Frontend Development

### Adding a New Page

1. Create the page component in `client/src/pages/`:

```typescript
// client/src/pages/my-page.tsx
export default function MyPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold">My Page</h1>
    </div>
  );
}
```

2. Register the route in `client/src/App.tsx`:

```typescript
import MyPage from "@/pages/my-page";

// In the Router component:
<Route path="/my-page" component={MyPage} />
```

### Using React Query

```typescript
import { useQuery } from "@tanstack/react-query";

function MyComponent() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["/api/my-endpoint"],
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;
  
  return <div>{/* Render data */}</div>;
}
```

### Form Handling

Use `react-hook-form` with `zodResolver`:

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
});

function MyForm() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "" },
  });

  return (
    <Form {...form}>
      {/* Form fields */}
    </Form>
  );
}
```

---

## Styling and Theming

### Design System

DesignFlow Kit uses a custom design system with:

- **Fonts**: Inter (body), Space Grotesk (headings)
- **Colors**: Defined in `client/src/index.css`
- **Components**: shadcn/ui with custom styling

### CSS Variables

Color tokens are defined in `client/src/index.css`:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --primary: 262 80% 50%;
  /* ... more variables */
}

.dark {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  /* ... dark mode overrides */
}
```

### Using Tailwind Classes

```tsx
// Good: Use semantic color classes
<div className="bg-background text-foreground">
  <Button variant="primary">Click me</Button>
</div>

// Good: Use responsive prefixes
<div className="text-sm md:text-base lg:text-lg">
  Responsive text
</div>
```

### Dark Mode

Dark mode is class-based. The theme toggle adds/removes the `dark` class on `<html>`:

```typescript
// ThemeProvider handles this automatically
document.documentElement.classList.toggle("dark");
```

---

## Adding New Tools

### Step 1: Define the Tool

Add to `client/src/lib/data.ts`:

```typescript
export const preKitTools: Tool[] = [
  // ... existing tools
  {
    id: "my-new-tool",
    title: "My New Tool",
    description: "Short description of the tool",
    icon: MyIcon,
    integrations: ["Figma", "Notion"],
    phase: "pre",
    detailedDescription: "Detailed description...",
    howToUse: [
      "Step 1: Do this",
      "Step 2: Then this",
    ],
    youtubeId: "VIDEO_ID",
    signupUrl: "https://example.com",
    signupLabel: "Get Started"
  }
];
```

### Step 2: Import Icon

```typescript
import { MyIcon } from "lucide-react";
```

### Step 3: Test

1. View the tool on the dashboard
2. Navigate to the tool detail page
3. Verify video and integrations display correctly

---

## Adding Integrations

### Step 1: Define the Integration

Add to `client/src/lib/data.ts`:

```typescript
export const integrations: Integration[] = [
  // ... existing integrations
  {
    id: "my-integration",
    name: "My Integration",
    description: "What this tool does",
    icon: "🔧",
    category: "design",
    features: ["Feature 1", "Feature 2"],
    website: "https://example.com",
    docsUrl: "https://docs.example.com",
    youtubeId: "VIDEO_ID",
    howToUse: ["Step 1", "Step 2"],
    apiDocumentation: {
      baseUrl: "https://api.example.com/v1",
      authMethod: "Bearer Token",
      endpoints: [
        {
          method: "GET",
          path: "/resources",
          description: "List all resources"
        }
      ]
    }
  }
];
```

---

## Testing

### Manual Testing

1. Start the dev server: `npm run dev`
2. Test all routes and interactions
3. Check responsive design at different breakpoints
4. Verify dark mode toggle works

### Key Areas to Test

| Area | What to Check |
|------|---------------|
| Dashboard | Progress tracking, localStorage persistence |
| Tool Details | Video embedding, link functionality |
| Integrations | API documentation display |
| Navigation | All links work correctly |
| Responsive | Mobile, tablet, desktop views |
| Theme | Light/dark mode switching |

---

## Build and Deployment

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

This creates:
- `dist/public/` - Static frontend assets
- `dist/index.js` - Compiled server bundle

### Environment Variables

No environment variables are required. The application uses:
- Static data from `client/src/lib/data.ts`
- Browser localStorage for user progress

### Deployment on Replit

1. Push changes to GitHub
2. Replit automatically deploys on push
3. Use Replit's publishing feature for production

---

## Best Practices

### Code Style

- Use TypeScript for type safety
- Follow existing naming conventions
- Add `data-testid` attributes to interactive elements
- Keep components focused and reusable

### Performance

- Use React Query for caching
- Lazy load large components
- Optimize images before adding

### Accessibility

- Use semantic HTML elements
- Include ARIA labels where needed
- Ensure keyboard navigation works
- Maintain color contrast ratios

---

**[Back to README](../README.md)** | **[User Guide](user-guide.md)** | **[Integrations](integrations.md)**
