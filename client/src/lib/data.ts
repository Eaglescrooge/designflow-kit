import { 
  Search, 
  Users, 
  Map, 
  Layout, 
  TestTube, 
  Presentation, 
  Palette, 
  Layers, 
  Smartphone,
  ClipboardCheck,
  Send,
  FileCode,
  LayoutDashboard,
  BarChart3,
  FileText
} from "lucide-react";

export const preKitTools = [
  {
    id: "research",
    title: "Research Tools",
    description: "Structured templates and frameworks for conducting user research, competitive analysis, and market validation with automated data collection.",
    icon: Search,
    integrations: ["Typeform", "Google Forms", "Airtable", "Notion"]
  },
  {
    id: "synthesize",
    title: "Synthesize Data",
    description: "Transform raw research data into actionable insights using affinity mapping, thematic analysis, and data visualization frameworks.",
    icon: BarChart3,
    integrations: ["Miro", "Dovetail", "Google Sheets"]
  },
  {
    id: "personas",
    title: "Create Personas",
    description: "Data-driven persona creation toolkit with customizable templates, empathy maps, and behavioral pattern analysis.",
    icon: Users,
    integrations: ["Figma", "Canva", "HubSpot"]
  },
  {
    id: "journey",
    title: "Journey Maps",
    description: "Comprehensive journey mapping tools to visualize user experiences, touchpoints, pain points, and opportunities.",
    icon: Map,
    integrations: ["Miro", "Lucidchart", "Smaply"]
  },
  {
    id: "wireframes-lo",
    title: "Lo-Fi Wireframes",
    description: "Rapid wireframing toolkit with pre-built components, grid systems, and annotation tools for quick concept validation.",
    icon: Layout,
    integrations: ["Figma", "Balsamiq", "Whimsical"]
  },
  {
    id: "testing-lo",
    title: "UX Testing",
    description: "Structured testing framework for validating low-fidelity designs with scripts, observation guides, and analysis templates.",
    icon: TestTube,
    integrations: ["UserTesting", "Lookback", "Optimal Workshop"]
  },
  {
    id: "workshops",
    title: "Workshop Tools",
    description: "Complete workshop toolkit including card sorting, design thinking exercises, and collaborative ideation frameworks.",
    icon: Presentation,
    integrations: ["OptimalSort", "Mural", "Mentimeter"]
  },
  {
    id: "design-system",
    title: "Design System",
    description: "Comprehensive design system builder with token management, component libraries, and automated documentation.",
    icon: Palette,
    integrations: ["Figma", "Zeroheight", "Storybook"]
  },
  {
    id: "wireframes-hi",
    title: "Hi-Fi Wireframes",
    description: "Production-ready design toolkit with pixel-perfect components, interaction patterns, and responsive frameworks.",
    icon: Layers,
    integrations: ["Figma", "Sketch", "Adobe XD"]
  },
  {
    id: "prototype",
    title: "UX Prototype",
    description: "Advanced prototyping toolkit with interaction design patterns, animation libraries, and user flow simulation.",
    icon: Smartphone,
    integrations: ["Figma", "ProtoPie", "Principle"]
  }
];

export const postKitTools = [
  {
    id: "review",
    title: "Design Review",
    description: "Structured design review framework with scheduling automation, feedback collection, and stakeholder alignment tools.",
    icon: ClipboardCheck,
    integrations: ["Calendly", "Zoom", "Loom"]
  },
  {
    id: "shipping",
    title: "Design Shipping",
    description: "Automated design shipping workflow with asset management, version control, and release documentation.",
    icon: Send,
    integrations: ["Figma", "Abstract", "GitHub"]
  },
  {
    id: "handover",
    title: "Dev Handover",
    description: "Seamless developer handover toolkit with automated specifications, code snippets, and asset delivery systems.",
    icon: FileCode,
    integrations: ["Zeplin", "Avocode", "Figma"]
  },
  {
    id: "sprint",
    title: "Sprint Board",
    description: "Agile design sprint management with integrated planning, tracking, and collaboration tools.",
    icon: LayoutDashboard,
    integrations: ["Jira", "Trello", "Asana"]
  },
  {
    id: "usability",
    title: "Usability Testing",
    description: "Comprehensive post-launch testing suite with A/B testing, usability metrics, and behavior analysis tools.",
    icon: BarChart3,
    integrations: ["Maze", "Hotjar", "Optimizely"]
  },
  {
    id: "docs",
    title: "Process Docs",
    description: "Standardized design process documentation with best practices, quality gates, and improvement frameworks.",
    icon: FileText,
    integrations: ["Confluence", "Notion", "GitBook"]
  }
];

export const integrations = [
  { name: "Figma", category: "Design" },
  { name: "Miro", category: "Collaboration" },
  { name: "Notion", category: "Documentation" },
  { name: "Jira", category: "Project Management" },
  { name: "Slack", category: "Communication" },
  { name: "GitHub", category: "Version Control" },
  { name: "Zeplin", category: "Handover" },
  { name: "Hotjar", category: "Analytics" },
  { name: "UserTesting", category: "Research" },
  { name: "Storybook", category: "Components" },
  { name: "Abstract", category: "Version Control" },
  { name: "Dovetail", category: "Research" }
];

export const stats = [
  { label: "Downloads", value: "25K+", description: "Monthly installs" },
  { label: "Contributors", value: "150+", description: "Active developers" },
  { label: "GitHub Stars", value: "8.5K", description: "Growing community" },
  { label: "Integrations", value: "40+", description: "Tools connected" }
];

export const quickStartCode = `# Install DesignFlow Kit
npm install designflow-kit

# Initialize in your project
npx designflow init

# Start the development server
npm run designflow`;

export const footerLinks = {
  product: [
    { label: "Pre-Kit", href: "#pre-kit" },
    { label: "Post-Kit", href: "#post-kit" },
    { label: "Integrations", href: "#integrations" },
    { label: "Changelog", href: "#" }
  ],
  resources: [
    { label: "Documentation", href: "#" },
    { label: "API Reference", href: "#" },
    { label: "Examples", href: "#" },
    { label: "Templates", href: "#" }
  ],
  community: [
    { label: "GitHub", href: "#" },
    { label: "Discord", href: "#" },
    { label: "Twitter", href: "#" },
    { label: "Contributing", href: "#" }
  ],
  legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "License", href: "#" }
  ]
};
