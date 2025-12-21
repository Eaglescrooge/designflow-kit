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
  FileText,
  LucideIcon
} from "lucide-react";

export interface Tool {
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

export const preKitTools: Tool[] = [
  {
    id: "research",
    title: "Research Tools",
    description: "Structured templates and frameworks for conducting user research, competitive analysis, and market validation with automated data collection.",
    icon: Search,
    integrations: ["Typeform", "Google Forms", "Airtable", "Notion"],
    phase: "pre",
    detailedDescription: "User research is the foundation of great design. Our Research Tools module provides structured templates and frameworks for conducting comprehensive user research, competitive analysis, and market validation. Automate data collection and organize your findings in one central location.",
    howToUse: [
      "Start by defining your research objectives and target audience",
      "Choose from pre-built survey templates or create custom research scripts",
      "Distribute surveys via integrated platforms like Typeform or Google Forms",
      "Collect and organize responses automatically in Airtable or Notion",
      "Generate insights reports with our analysis templates"
    ],
    youtubeId: "WpzmOH0hrEM",
    signupUrl: "https://www.typeform.com/",
    signupLabel: "Get Started with Typeform"
  },
  {
    id: "synthesize",
    title: "Synthesize Data",
    description: "Transform raw research data into actionable insights using affinity mapping, thematic analysis, and data visualization frameworks.",
    icon: BarChart3,
    integrations: ["Miro", "Dovetail", "Google Sheets"],
    phase: "pre",
    detailedDescription: "Raw research data is only valuable when properly synthesized. This module helps you transform user interviews, survey responses, and observational data into actionable insights through affinity mapping, thematic analysis, and visual frameworks that reveal patterns and opportunities.",
    howToUse: [
      "Import your research data from various sources",
      "Use affinity mapping templates to group related insights",
      "Apply thematic analysis frameworks to identify patterns",
      "Create visual data representations with built-in chart templates",
      "Export synthesized findings for stakeholder presentations"
    ],
    youtubeId: "qSrOq8w_6R8",
    signupUrl: "https://miro.com/",
    signupLabel: "Try Miro Free"
  },
  {
    id: "personas",
    title: "Create Personas",
    description: "Data-driven persona creation toolkit with customizable templates, empathy maps, and behavioral pattern analysis.",
    icon: Users,
    integrations: ["Figma", "Canva", "HubSpot"],
    phase: "pre",
    detailedDescription: "Personas bring your users to life. Our persona creation toolkit helps you build data-driven user personas using research insights, demographic data, and behavioral patterns. Create empathy maps, user profiles, and journey touchpoints that keep your team aligned on who you're designing for.",
    howToUse: [
      "Gather demographic and behavioral data from your research",
      "Select a persona template that fits your project needs",
      "Fill in user goals, pain points, and motivations",
      "Create empathy maps to understand emotional drivers",
      "Share personas with your team via Figma or export as PDF"
    ],
    youtubeId: "u44pBnAn7cM",
    signupUrl: "https://www.figma.com/",
    signupLabel: "Start with Figma"
  },
  {
    id: "journey",
    title: "Journey Maps",
    description: "Comprehensive journey mapping tools to visualize user experiences, touchpoints, pain points, and opportunities.",
    icon: Map,
    integrations: ["Miro", "Lucidchart", "Smaply"],
    phase: "pre",
    detailedDescription: "Journey maps reveal the complete user experience across all touchpoints. Map out every stage of your user's journey, from awareness to advocacy, identifying pain points, emotional highs and lows, and opportunities for improvement along the way.",
    howToUse: [
      "Define the journey stages for your user experience",
      "Map touchpoints and channels at each stage",
      "Plot emotional highs and lows throughout the journey",
      "Identify pain points and opportunity areas",
      "Add actions, thoughts, and feelings for each stage"
    ],
    youtubeId: "2W13ext26kQ",
    signupUrl: "https://www.smaply.com/",
    signupLabel: "Create Journey Maps"
  },
  {
    id: "wireframes-lo",
    title: "Lo-Fi Wireframes",
    description: "Rapid wireframing toolkit with pre-built components, grid systems, and annotation tools for quick concept validation.",
    icon: Layout,
    integrations: ["Figma", "Balsamiq", "Whimsical"],
    phase: "pre",
    detailedDescription: "Low-fidelity wireframes let you explore ideas quickly without getting caught up in visual details. Use our pre-built component libraries and grid systems to rapidly sketch out concepts, test information architecture, and validate ideas before investing in high-fidelity designs.",
    howToUse: [
      "Start with a blank canvas or select a device template",
      "Drag and drop lo-fi components from the library",
      "Focus on layout and content hierarchy, not visual design",
      "Add annotations to explain functionality",
      "Share with stakeholders for quick feedback"
    ],
    youtubeId: "qpH7-KFWZRI",
    signupUrl: "https://balsamiq.com/",
    signupLabel: "Try Balsamiq"
  },
  {
    id: "testing-lo",
    title: "UX Testing",
    description: "Structured testing framework for validating low-fidelity designs with scripts, observation guides, and analysis templates.",
    icon: TestTube,
    integrations: ["UserTesting", "Lookback", "Optimal Workshop"],
    phase: "pre",
    detailedDescription: "Test early and often with our UX testing framework. Validate your wireframes and early concepts with real users using structured testing scripts, observation guides, and analysis templates that help you capture and act on feedback effectively.",
    howToUse: [
      "Create a test plan using our structured templates",
      "Write test scripts with clear tasks and scenarios",
      "Recruit participants through integrated platforms",
      "Use observation guides during testing sessions",
      "Analyze results with our findings templates"
    ],
    youtubeId: "0YL0xoSmyZI",
    signupUrl: "https://www.usertesting.com/",
    signupLabel: "Start User Testing"
  },
  {
    id: "workshops",
    title: "Workshop Tools",
    description: "Complete workshop toolkit including card sorting, design thinking exercises, and collaborative ideation frameworks.",
    icon: Presentation,
    integrations: ["OptimalSort", "Mural", "Mentimeter"],
    phase: "pre",
    detailedDescription: "Facilitate effective design workshops with our complete toolkit. From card sorting exercises to design thinking activities, run collaborative sessions that generate insights, align stakeholders, and drive creative problem-solving.",
    howToUse: [
      "Choose a workshop format based on your goals",
      "Prepare materials using our exercise templates",
      "Set up digital collaboration boards in Mural",
      "Facilitate activities with built-in timers and prompts",
      "Capture and synthesize workshop outputs"
    ],
    youtubeId: "z20bCGluCao",
    signupUrl: "https://www.optimalworkshop.com/",
    signupLabel: "Run Card Sorting"
  },
  {
    id: "design-system",
    title: "Design System",
    description: "Comprehensive design system builder with token management, component libraries, and automated documentation.",
    icon: Palette,
    integrations: ["Figma", "Zeroheight", "Storybook"],
    phase: "pre",
    detailedDescription: "Build a scalable design system that ensures consistency across all your products. Manage design tokens, create component libraries, and generate automated documentation that keeps designers and developers aligned.",
    howToUse: [
      "Define your design tokens (colors, typography, spacing)",
      "Create foundational components following atomic design",
      "Document usage guidelines and best practices",
      "Set up version control and change management",
      "Publish your design system for team access"
    ],
    youtubeId: "Dtd40cHQQlk",
    signupUrl: "https://zeroheight.com/",
    signupLabel: "Document Your System"
  },
  {
    id: "wireframes-hi",
    title: "Hi-Fi Wireframes",
    description: "Production-ready design toolkit with pixel-perfect components, interaction patterns, and responsive frameworks.",
    icon: Layers,
    integrations: ["Figma", "Sketch", "Adobe XD"],
    phase: "pre",
    detailedDescription: "Create production-ready designs with our high-fidelity wireframe toolkit. Access pixel-perfect components, interaction patterns, and responsive frameworks that translate seamlessly into development-ready specifications.",
    howToUse: [
      "Apply your design system tokens and components",
      "Create responsive layouts for all breakpoints",
      "Add micro-interactions and state variations",
      "Include detailed specifications for developers",
      "Prepare assets for handover"
    ],
    youtubeId: "FK4YusHIIj0",
    signupUrl: "https://www.figma.com/",
    signupLabel: "Design in Figma"
  },
  {
    id: "prototype",
    title: "UX Prototype",
    description: "Advanced prototyping toolkit with interaction design patterns, animation libraries, and user flow simulation.",
    icon: Smartphone,
    integrations: ["Figma", "ProtoPie", "Principle"],
    phase: "pre",
    detailedDescription: "Bring your designs to life with interactive prototypes. Create realistic user flows, micro-interactions, and animations that help stakeholders visualize the final experience and enable meaningful user testing.",
    howToUse: [
      "Connect your screens to create user flows",
      "Add transitions and animations between states",
      "Implement micro-interactions for feedback",
      "Test prototypes on actual devices",
      "Share interactive prototypes for review"
    ],
    youtubeId: "PaPIsyO1t3Q",
    signupUrl: "https://www.protopie.io/",
    signupLabel: "Create with ProtoPie"
  }
];

export const postKitTools: Tool[] = [
  {
    id: "review",
    title: "Design Review",
    description: "Structured design review framework with scheduling automation, feedback collection, and stakeholder alignment tools.",
    icon: ClipboardCheck,
    integrations: ["Calendly", "Zoom", "Loom"],
    phase: "post",
    detailedDescription: "Run effective design reviews that gather meaningful feedback and align stakeholders. Our framework provides structured templates for organizing reviews, collecting feedback, and ensuring all voices are heard in the design process.",
    howToUse: [
      "Schedule review sessions with integrated calendar tools",
      "Prepare presentation materials using our templates",
      "Use structured feedback forms to collect input",
      "Document decisions and action items",
      "Track feedback resolution over time"
    ],
    youtubeId: "hpxUB8DVsvw",
    signupUrl: "https://www.loom.com/",
    signupLabel: "Record with Loom"
  },
  {
    id: "shipping",
    title: "Design Shipping",
    description: "Automated design shipping workflow with asset management, version control, and release documentation.",
    icon: Send,
    integrations: ["Figma", "Abstract", "GitHub"],
    phase: "post",
    detailedDescription: "Ship designs with confidence using our automated workflow. Manage assets, control versions, and generate release documentation that ensures nothing gets lost between design and development.",
    howToUse: [
      "Organize design files in a structured folder system",
      "Export assets at required resolutions and formats",
      "Tag versions and document changes",
      "Create release notes for each design update",
      "Sync with development repositories"
    ],
    youtubeId: "wIq0y86jg3g",
    signupUrl: "https://www.abstract.com/",
    signupLabel: "Try Abstract"
  },
  {
    id: "handover",
    title: "Dev Handover",
    description: "Seamless developer handover toolkit with automated specifications, code snippets, and asset delivery systems.",
    icon: FileCode,
    integrations: ["Zeplin", "Avocode", "Figma"],
    phase: "post",
    detailedDescription: "Bridge the gap between design and development with our handover toolkit. Generate automated specifications, provide code snippets, and deliver assets in a format developers love working with.",
    howToUse: [
      "Sync your designs to the handover platform",
      "Generate CSS/code specifications automatically",
      "Mark up designs with developer annotations",
      "Organize assets for easy developer access",
      "Track implementation status"
    ],
    youtubeId: "B242nuM3y2s",
    signupUrl: "https://zeplin.io/",
    signupLabel: "Start with Zeplin"
  },
  {
    id: "sprint",
    title: "Sprint Board",
    description: "Agile design sprint management with integrated planning, tracking, and collaboration tools.",
    icon: LayoutDashboard,
    integrations: ["Jira", "Trello", "Asana"],
    phase: "post",
    detailedDescription: "Manage design work in agile sprints with our integrated sprint board. Plan design tasks, track progress, and collaborate with development teams using tools that fit seamlessly into agile workflows.",
    howToUse: [
      "Create design tasks linked to user stories",
      "Estimate effort and assign to team members",
      "Track progress through design stages",
      "Collaborate with developers on shared boards",
      "Review sprint velocity and capacity"
    ],
    youtubeId: "GGbLLHCOWuM",
    signupUrl: "https://trello.com/",
    signupLabel: "Get Started with Trello"
  },
  {
    id: "usability",
    title: "Usability Testing",
    description: "Comprehensive post-launch testing suite with A/B testing, usability metrics, and behavior analysis tools.",
    icon: BarChart3,
    integrations: ["Maze", "Hotjar", "Optimizely"],
    phase: "post",
    detailedDescription: "Validate your live designs with real user data. Run A/B tests, measure usability metrics, and analyze user behavior to continuously improve your product based on evidence, not assumptions.",
    howToUse: [
      "Set up heatmaps and session recordings",
      "Create A/B tests for design variations",
      "Define success metrics and track conversions",
      "Analyze user behavior patterns",
      "Generate improvement recommendations"
    ],
    youtubeId: "jEmEuPb6hUw",
    signupUrl: "https://maze.co/",
    signupLabel: "Test with Maze"
  },
  {
    id: "docs",
    title: "Process Docs",
    description: "Standardized design process documentation with best practices, quality gates, and improvement frameworks.",
    icon: FileText,
    integrations: ["Confluence", "Notion", "GitBook"],
    phase: "post",
    detailedDescription: "Document your design process for consistency and scale. Create standardized workflows, establish quality gates, and build a knowledge base that helps your team deliver great design consistently.",
    howToUse: [
      "Define your design process stages",
      "Create templates for each deliverable type",
      "Establish quality checkpoints and review criteria",
      "Document best practices and guidelines",
      "Build a searchable design knowledge base"
    ],
    youtubeId: "m1ORB0_LO9k",
    signupUrl: "https://www.notion.so/",
    signupLabel: "Start with Notion"
  }
];

export const allTools = [...preKitTools, ...postKitTools];

export const getToolById = (id: string): Tool | undefined => {
  return allTools.find(tool => tool.id === id);
};

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
