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

export function createEmptyBoard(name: string = "My Sprint Board"): SprintBoard {
  return {
    id: generateId(),
    name,
    templateId: null,
    lanes: [
      { id: generateId(), title: "Backlog", phaseType: "general", order: 0, cards: [] },
      { id: generateId(), title: "In Progress", phaseType: "team", order: 1, cards: [] },
      { id: generateId(), title: "Review", phaseType: "voting", order: 2, cards: [] },
      { id: generateId(), title: "Done", phaseType: "general", order: 3, cards: [] },
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
