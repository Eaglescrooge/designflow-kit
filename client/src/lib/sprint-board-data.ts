export interface SprintCard {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  owner: string;
  order: number;
}

export interface SprintLane {
  id: string;
  title: string;
  phaseType: "individual" | "team" | "voting" | "general";
  order: number;
  cards: SprintCard[];
}

export interface SprintBoard {
  id: string;
  name: string;
  templateId: string | null;
  lanes: SprintLane[];
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = "designflow-sprint-board";

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export function loadBoard(): SprintBoard | null {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) return JSON.parse(data);
    return null;
  } catch {
    return null;
  }
}

export function saveBoard(board: SprintBoard): void {
  board.updatedAt = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(board));
}

const DEFAULT_CARDS: { title: string; description: string; priority: "high" | "medium" | "low"; owner: string }[] = [
  { title: "Micro-interactions for Checkout", description: "Design and prototype subtle animations for button hovers, loading states, and success confirmations on the payment page to reduce perceived wait time.", priority: "medium", owner: "Motion Designer" },
  { title: "Dark Mode Color Palette", description: "Audit the current color system and create a high-contrast dark mode palette that meets WCAG AAA accessibility standards.", priority: "high", owner: "Visual Designer" },
  { title: "Onboarding Flow Usability Test", description: "Recruit 5 users to test the new sign-up flow. Focus on drop-off rates at the phone verification step and document findings.", priority: "high", owner: "UX Researcher" },
  { title: "Empty States Illustration Set", description: "Create a set of friendly, on-brand illustrations for empty states (inbox, dashboard, search results) to guide users on next steps.", priority: "low", owner: "Illustrator" },
  { title: "Mobile Navigation Prototype", description: "Build a clickable prototype in Figma for the new bottom navigation bar, including haptic feedback simulation for key actions.", priority: "medium", owner: "Product Designer" },
  { title: "Accessibility Audit (Screen Readers)", description: "Run the settings page through a screen reader (VoiceOver/NVDA) to ensure all toggle switches and sliders are properly labeled and navigable.", priority: "high", owner: "UI Engineer" },
  { title: "Data Visualization Design", description: "Redesign the analytics dashboard graphs to be more digestible. Explore different chart types for comparing user engagement over time.", priority: "medium", owner: "UX Designer" },
  { title: "404 Page Creative Concept", description: "Brainstorm and sketch a fun, interactive 404 page that includes a search bar and links to popular pages to retain lost users.", priority: "low", owner: "Creative Director" },
  { title: "Design System: Icon Library", description: "Audit all existing icons for consistency in stroke weight and sizing. Export and package them as a standardized font or SVG sprite.", priority: "medium", owner: "UI Designer" },
  { title: "User Persona: Power User", description: "Draft a new persona based on analytics data showing users who use the API integration features most frequently.", priority: "low", owner: "Product Manager" },
  { title: "Settings Information Architecture", description: "Reorganize the settings menu categories. Users currently struggle to find privacy options versus notification controls.", priority: "high", owner: "Information Architect" },
  { title: "Gesture Control Mapping", description: "Define the swipe gestures for the mobile app (e.g., swipe left to archive, right to snooze) and create an interactive tutorial for them.", priority: "medium", owner: "Interaction Designer" },
  { title: "Loading Skeleton Screens", description: "Replace the current loading spinners with skeleton screens that mimic the page layout to make loading feel faster.", priority: "medium", owner: "Frontend Designer" },
  { title: "Form Error Message Copy", description: "Rewrite all form validation error messages to be more human and helpful, explaining how to fix the error, not just that it exists.", priority: "low", owner: "UX Writer" },
  { title: "Competitive Analysis: Checkout Flow", description: "Conduct a competitive analysis of checkout flows in three competing products. Identify best practices and pain points to avoid.", priority: "high", owner: "UX Strategist" },
  { title: "Hero Section A/B Variant", description: "Design a second variant of the marketing site hero section with a different value proposition and CTA placement for A/B testing.", priority: "medium", owner: "Marketing Designer" },
  { title: "Font Hierarchy Review", description: "Review the current typography scale. Ensure heading levels (H1, H2, H3) are semantically correct and visually distinct on article pages.", priority: "low", owner: "Brand Designer" },
  { title: "User Journey Map: Subscription Cancellation", description: "Map out the current user journey for canceling a subscription, identifying emotional highs/lows and opportunities to offer a pause option instead.", priority: "high", owner: "UX Lead" },
  { title: "Interactive Component: Date Picker", description: "Design a custom date picker component for the booking form that visually highlights available vs. unavailable dates clearly.", priority: "medium", owner: "UI Developer" },
  { title: "Design Handoff: Filter Component", description: "Prepare the design specs for the new product filter component, including multi-select states, clear all functionality, and edge cases.", priority: "high", owner: "Product Designer" },
];

export function createEmptyBoard(name: string = "DesignFlow Sprint Board"): SprintBoard {
  const backlogCards = DEFAULT_CARDS.slice(0, 7).map((c, i) => ({
    id: generateId(),
    title: c.title,
    description: c.description,
    priority: c.priority,
    owner: c.owner,
    order: i,
  }));
  const inProgressCards = DEFAULT_CARDS.slice(7, 13).map((c, i) => ({
    id: generateId(),
    title: c.title,
    description: c.description,
    priority: c.priority,
    owner: c.owner,
    order: i,
  }));
  const reviewCards = DEFAULT_CARDS.slice(13, 17).map((c, i) => ({
    id: generateId(),
    title: c.title,
    description: c.description,
    priority: c.priority,
    owner: c.owner,
    order: i,
  }));
  const doneCards = DEFAULT_CARDS.slice(17, 20).map((c, i) => ({
    id: generateId(),
    title: c.title,
    description: c.description,
    priority: c.priority,
    owner: c.owner,
    order: i,
  }));

  return {
    id: generateId(),
    name,
    templateId: null,
    lanes: [
      { id: generateId(), title: "Backlog", phaseType: "general", order: 0, cards: backlogCards },
      { id: generateId(), title: "In Progress", phaseType: "team", order: 1, cards: inProgressCards },
      { id: generateId(), title: "Review", phaseType: "voting", order: 2, cards: reviewCards },
      { id: generateId(), title: "Done", phaseType: "general", order: 3, cards: doneCards },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export function createCard(title: string = "New Task"): SprintCard {
  return {
    id: generateId(),
    title,
    description: "",
    priority: "medium",
    owner: "",
    order: 0,
  };
}

export interface SprintTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  lanes: Omit<SprintLane, "id" | "cards">[];
}

export const sprintTemplates: SprintTemplate[] = [
  {
    id: "gv-sprint",
    name: "GV Design Sprint",
    description: "The classic Google Ventures 5-day design sprint: Map, Sketch, Decide, Prototype, Test",
    category: "Design Sprint",
    lanes: [
      { title: "Day 1: Map", phaseType: "team", order: 0 },
      { title: "Day 2: Sketch", phaseType: "individual", order: 1 },
      { title: "Day 3: Decide", phaseType: "voting", order: 2 },
      { title: "Day 4: Prototype", phaseType: "team", order: 3 },
      { title: "Day 5: Test", phaseType: "team", order: 4 },
    ],
  },
  {
    id: "sprint-2.0",
    name: "Design Sprint 2.0",
    description: "The streamlined 4-day format for faster iteration",
    category: "Design Sprint",
    lanes: [
      { title: "Day 1: Map & Sketch", phaseType: "team", order: 0 },
      { title: "Day 2: Decide & Storyboard", phaseType: "voting", order: 1 },
      { title: "Day 3: Prototype", phaseType: "individual", order: 2 },
      { title: "Day 4: Test & Learn", phaseType: "team", order: 3 },
    ],
  },
  {
    id: "design-thinking",
    name: "Design Thinking",
    description: "Stanford d.school framework: Empathize, Define, Ideate, Prototype, Test",
    category: "Framework",
    lanes: [
      { title: "Empathize", phaseType: "team", order: 0 },
      { title: "Define", phaseType: "team", order: 1 },
      { title: "Ideate", phaseType: "individual", order: 2 },
      { title: "Prototype", phaseType: "individual", order: 3 },
      { title: "Test", phaseType: "team", order: 4 },
    ],
  },
  {
    id: "double-diamond",
    name: "Double Diamond",
    description: "British Design Council framework: Discover, Define, Develop, Deliver",
    category: "Framework",
    lanes: [
      { title: "Discover", phaseType: "team", order: 0 },
      { title: "Define", phaseType: "voting", order: 1 },
      { title: "Develop", phaseType: "individual", order: 2 },
      { title: "Deliver", phaseType: "team", order: 3 },
    ],
  },
  {
    id: "lean-ux",
    name: "Lean UX Canvas",
    description: "Problem-focused approach: Problem, Outcomes, Personas, Ideas, Assumptions, Hypotheses",
    category: "Canvas",
    lanes: [
      { title: "Problem Statement", phaseType: "team", order: 0 },
      { title: "Business Outcomes", phaseType: "team", order: 1 },
      { title: "Users & Personas", phaseType: "individual", order: 2 },
      { title: "Solutions & Ideas", phaseType: "individual", order: 3 },
      { title: "Assumptions", phaseType: "voting", order: 4 },
      { title: "Hypotheses", phaseType: "team", order: 5 },
    ],
  },
  {
    id: "job-stories",
    name: "Job Stories",
    description: "Focus on situational context: When ___, I want to ___, so I can ___",
    category: "Framework",
    lanes: [
      { title: "Situations (When...)", phaseType: "team", order: 0 },
      { title: "Motivations (I want to...)", phaseType: "individual", order: 1 },
      { title: "Outcomes (So I can...)", phaseType: "individual", order: 2 },
      { title: "Solutions", phaseType: "team", order: 3 },
    ],
  },
];

export function applyTemplate(template: SprintTemplate): SprintBoard {
  return {
    id: generateId(),
    name: template.name,
    templateId: template.id,
    lanes: template.lanes.map((lane) => ({
      ...lane,
      id: generateId(),
      cards: [],
    })),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}
