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

export interface ApiEndpoint {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  path: string;
  description: string;
}

export interface ApiDocs {
  authMethod: string;
  baseUrl: string;
  endpoints: ApiEndpoint[];
  codeExample: string;
  docsUrl: string;
}

export interface IntegrationTool {
  id: string;
  name: string;
  category: string;
  description: string;
  detailedDescription: string;
  howToUse: string[];
  youtubeId: string;
  signupUrl: string;
  signupLabel: string;
  usedIn: string[];
  apiDocs: ApiDocs;
}

export const integrationTools: IntegrationTool[] = [
  {
    id: "typeform",
    name: "Typeform",
    category: "Survey & Forms",
    description: "Beautiful, conversational forms and surveys that feel human.",
    detailedDescription: "Typeform revolutionizes the way you collect data. Create beautiful, interactive surveys that feel like a conversation. With its one-question-at-a-time format, Typeform achieves higher completion rates and more thoughtful responses than traditional forms.",
    howToUse: [
      "Create a Typeform account and start with a blank form or template",
      "Add questions using the intuitive drag-and-drop builder",
      "Customize the design to match your brand colors and fonts",
      "Set up logic jumps to personalize the survey experience",
      "Share via link, embed on your website, or send via email"
    ],
    youtubeId: "o3HqoHKYs_s",
    signupUrl: "https://www.typeform.com/signup/",
    signupLabel: "Start Free with Typeform",
    usedIn: ["Research Tools"],
    apiDocs: {
      authMethod: "Bearer Token - Generate a Personal Access Token from your Typeform account settings",
      baseUrl: "https://api.typeform.com",
      endpoints: [
        { method: "GET", path: "/forms", description: "List all forms in your account" },
        { method: "GET", path: "/forms/{form_id}", description: "Get details of a specific form" },
        { method: "GET", path: "/forms/{form_id}/responses", description: "Retrieve form responses" }
      ],
      codeExample: `const response = await fetch('https://api.typeform.com/forms', {
  headers: {
    'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
  }
});
const forms = await response.json();`,
      docsUrl: "https://developer.typeform.com/get-started/"
    }
  },
  {
    id: "google-forms",
    name: "Google Forms",
    category: "Survey & Forms",
    description: "Free form builder integrated with Google Workspace.",
    detailedDescription: "Google Forms is a free, easy-to-use tool for creating surveys and quizzes. It integrates seamlessly with Google Sheets for automatic response collection and analysis. Perfect for quick user research surveys and feedback collection.",
    howToUse: [
      "Open Google Forms from your Google Drive or forms.google.com",
      "Choose a blank form or start from a template",
      "Add various question types: multiple choice, checkboxes, short answer, etc.",
      "Customize colors and add images or videos",
      "Share the form link or embed it in your website"
    ],
    youtubeId: "BtoOHhA3aPk",
    signupUrl: "https://forms.google.com/",
    signupLabel: "Create Free Form",
    usedIn: ["Research Tools"],
    apiDocs: {
      authMethod: "OAuth 2.0 - Use Google Apps Script or Google Forms API with service account",
      baseUrl: "https://forms.googleapis.com",
      endpoints: [
        { method: "GET", path: "/v1/forms/{formId}", description: "Get form metadata and questions" },
        { method: "GET", path: "/v1/forms/{formId}/responses", description: "List all form responses" },
        { method: "POST", path: "/v1/forms", description: "Create a new form" }
      ],
      codeExample: `const response = await fetch('https://forms.googleapis.com/v1/forms/{formId}', {
  headers: {
    'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
  }
});
const form = await response.json();`,
      docsUrl: "https://developers.google.com/forms/api/reference/rest"
    }
  },
  {
    id: "airtable",
    name: "Airtable",
    category: "Database & Organization",
    description: "Flexible database that works like a spreadsheet.",
    detailedDescription: "Airtable combines the simplicity of a spreadsheet with the power of a database. Create custom views, link records across tables, and build apps without coding. Perfect for organizing research data, managing design assets, and tracking project progress.",
    howToUse: [
      "Sign up for Airtable and create a new base (database)",
      "Define your table structure with custom field types",
      "Import existing data from spreadsheets or enter manually",
      "Create different views: grid, kanban, calendar, or gallery",
      "Share bases with team members and set permissions"
    ],
    youtubeId: "r0lsyTaAuJE",
    signupUrl: "https://airtable.com/signup",
    signupLabel: "Try Airtable Free",
    usedIn: ["Research Tools"],
    apiDocs: {
      authMethod: "Bearer Token - Generate a Personal Access Token from your Airtable account",
      baseUrl: "https://api.airtable.com/v0",
      endpoints: [
        { method: "GET", path: "/{baseId}/{tableName}", description: "List records in a table" },
        { method: "POST", path: "/{baseId}/{tableName}", description: "Create new records" },
        { method: "PATCH", path: "/{baseId}/{tableName}", description: "Update existing records" }
      ],
      codeExample: `const response = await fetch('https://api.airtable.com/v0/YOUR_BASE_ID/YOUR_TABLE', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});
const records = await response.json();`,
      docsUrl: "https://airtable.com/developers/web/api/introduction"
    }
  },
  {
    id: "notion",
    name: "Notion",
    category: "Documentation",
    description: "All-in-one workspace for notes, docs, and databases.",
    detailedDescription: "Notion is a versatile workspace that combines notes, wikis, and databases. Create research repositories, design documentation, and project wikis all in one place. Its flexible block-based editor makes it easy to organize any type of content.",
    howToUse: [
      "Create a Notion account and set up your workspace",
      "Start with templates for research, documentation, or project management",
      "Use blocks to add text, images, databases, and embeds",
      "Organize pages in a hierarchical structure with the sidebar",
      "Share pages publicly or invite team members to collaborate"
    ],
    youtubeId: "oTahLEX3NXo",
    signupUrl: "https://www.notion.so/signup",
    signupLabel: "Get Notion Free",
    usedIn: ["Research Tools", "Design Documentation"],
    apiDocs: {
      authMethod: "Bearer Token - Create an integration and get secret token from Notion settings",
      baseUrl: "https://api.notion.com/v1",
      endpoints: [
        { method: "POST", path: "/pages", description: "Create a new page" },
        { method: "GET", path: "/pages/{page_id}", description: "Retrieve a page" },
        { method: "POST", path: "/databases/{database_id}/query", description: "Query a database" }
      ],
      codeExample: `const response = await fetch('https://api.notion.com/v1/pages', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_INTEGRATION_TOKEN',
    'Notion-Version': '2022-06-28',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ parent: { database_id: 'DB_ID' }, properties: {} })
});
const page = await response.json();`,
      docsUrl: "https://developers.notion.com/reference/intro"
    }
  },
  {
    id: "miro",
    name: "Miro",
    category: "Collaboration & Whiteboard",
    description: "Online collaborative whiteboard for teams.",
    detailedDescription: "Miro is an infinite canvas for visual collaboration. Run brainstorming sessions, create affinity diagrams, map user journeys, and facilitate remote workshops. With real-time collaboration, teams can work together regardless of location.",
    howToUse: [
      "Create a Miro board from scratch or use a template",
      "Invite team members to collaborate in real-time",
      "Use sticky notes, shapes, and connectors to visualize ideas",
      "Organize content with frames and sections",
      "Present directly from Miro or export as images/PDFs"
    ],
    youtubeId: "pULLAEmhSho",
    signupUrl: "https://miro.com/signup/",
    signupLabel: "Start Free with Miro",
    usedIn: ["Synthesize Data", "Journey Maps"],
    apiDocs: {
      authMethod: "OAuth 2.0 - Create an app in Miro Developer Portal for access tokens",
      baseUrl: "https://api.miro.com/v2",
      endpoints: [
        { method: "GET", path: "/boards", description: "Get list of boards" },
        { method: "GET", path: "/boards/{board_id}", description: "Get specific board details" },
        { method: "POST", path: "/boards/{board_id}/sticky_notes", description: "Create a sticky note on a board" }
      ],
      codeExample: `const response = await fetch('https://api.miro.com/v2/boards', {
  headers: {
    'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
  }
});
const boards = await response.json();`,
      docsUrl: "https://developers.miro.com/reference/api-reference"
    }
  },
  {
    id: "dovetail",
    name: "Dovetail",
    category: "Research Analysis",
    description: "Customer research platform for analyzing qualitative data.",
    detailedDescription: "Dovetail helps you analyze, organize, and share user research at scale. Tag and highlight insights from interviews, transcribe audio and video, and create shareable research reports. Essential for teams doing regular user research.",
    howToUse: [
      "Upload interview recordings, notes, or survey responses",
      "Create tags to categorize insights and themes",
      "Highlight key quotes and observations",
      "Build insight boards to visualize patterns",
      "Share research findings with stakeholders via reports"
    ],
    youtubeId: "gNbE5ECTF0A",
    signupUrl: "https://dovetailapp.com/",
    signupLabel: "Try Dovetail Free",
    usedIn: ["Synthesize Data"],
    apiDocs: {
      authMethod: "No public API - Use Dovetail integrations and Zapier",
      baseUrl: "N/A",
      endpoints: [],
      codeExample: `// Dovetail does not offer a public API
// Use Zapier integration or built-in integrations
// Visit the official documentation for integration guides`,
      docsUrl: "https://dovetailapp.com/help/integrations"
    }
  },
  {
    id: "google-sheets",
    name: "Google Sheets",
    category: "Spreadsheet & Analysis",
    description: "Cloud-based spreadsheet for data analysis and collaboration.",
    detailedDescription: "Google Sheets is a powerful, free spreadsheet tool for organizing and analyzing research data. With built-in charts, pivot tables, and formulas, you can transform raw data into actionable insights. Real-time collaboration makes it easy for teams to work together.",
    howToUse: [
      "Create a new sheet from Google Drive",
      "Import data from forms, CSVs, or enter manually",
      "Use formulas to calculate metrics and analyze trends",
      "Create charts and graphs to visualize data",
      "Share with team members for collaborative analysis"
    ],
    youtubeId: "N2opj8XzYBY",
    signupUrl: "https://sheets.google.com/",
    signupLabel: "Open Google Sheets",
    usedIn: ["Synthesize Data"],
    apiDocs: {
      authMethod: "OAuth 2.0 - Use Google Sheets API with service account or OAuth credentials",
      baseUrl: "https://sheets.googleapis.com/v4",
      endpoints: [
        { method: "GET", path: "/spreadsheets/{spreadsheetId}", description: "Get spreadsheet metadata" },
        { method: "GET", path: "/spreadsheets/{spreadsheetId}/values/{range}", description: "Read cell values" },
        { method: "PUT", path: "/spreadsheets/{spreadsheetId}/values/{range}", description: "Update cell values" }
      ],
      codeExample: `const response = await fetch(
  'https://sheets.googleapis.com/v4/spreadsheets/SPREADSHEET_ID/values/Sheet1!A1:D10',
  {
    headers: { 'Authorization': 'Bearer YOUR_ACCESS_TOKEN' }
  }
);
const data = await response.json();`,
      docsUrl: "https://developers.google.com/sheets/api/reference/rest"
    }
  },
  {
    id: "figma",
    name: "Figma",
    category: "Design & Prototyping",
    description: "Collaborative interface design tool in the browser.",
    detailedDescription: "Figma is the industry-standard design tool for creating user interfaces, prototypes, and design systems. Its browser-based platform enables real-time collaboration, making it perfect for remote teams. From wireframes to high-fidelity designs, Figma handles it all.",
    howToUse: [
      "Create a Figma account and start a new design file",
      "Set up frames for different screen sizes",
      "Use components for reusable design elements",
      "Create interactive prototypes with connections",
      "Share designs for feedback or handoff to developers"
    ],
    youtubeId: "FTFaQWZBqQ8",
    signupUrl: "https://www.figma.com/signup",
    signupLabel: "Start Designing in Figma",
    usedIn: ["Create Personas", "Lo-Fi Wireframes", "Design System", "Hi-Fi Mockups", "Interactive Prototypes", "Version Control", "Developer Handoff"],
    apiDocs: {
      authMethod: "Bearer Token - Generate a Personal Access Token from Figma account settings",
      baseUrl: "https://api.figma.com/v1",
      endpoints: [
        { method: "GET", path: "/files/{file_key}", description: "Get file contents and metadata" },
        { method: "GET", path: "/files/{file_key}/nodes", description: "Get specific nodes from a file" },
        { method: "GET", path: "/images/{file_key}", description: "Export images from a file" }
      ],
      codeExample: `const response = await fetch('https://api.figma.com/v1/files/FILE_KEY', {
  headers: {
    'X-Figma-Token': 'YOUR_ACCESS_TOKEN'
  }
});
const file = await response.json();`,
      docsUrl: "https://www.figma.com/developers/api"
    }
  },
  {
    id: "canva",
    name: "Canva",
    category: "Graphic Design",
    description: "Easy-to-use graphic design platform for everyone.",
    detailedDescription: "Canva makes graphic design accessible to everyone. Create presentations, social graphics, personas, and more using thousands of templates. Perfect for non-designers who need to create professional-looking visual assets quickly.",
    howToUse: [
      "Sign up for Canva and browse templates",
      "Choose a template or start with custom dimensions",
      "Customize with your own text, images, and brand colors",
      "Use built-in stock photos, icons, and illustrations",
      "Download in various formats or share directly"
    ],
    youtubeId: "zJSgUx5K6V0",
    signupUrl: "https://www.canva.com/signup",
    signupLabel: "Create with Canva",
    usedIn: ["Create Personas"],
    apiDocs: {
      authMethod: "OAuth 2.0 - Create an app in Canva Developer Portal",
      baseUrl: "https://api.canva.com/rest/v1",
      endpoints: [
        { method: "GET", path: "/users/me", description: "Get current user profile" },
        { method: "GET", path: "/designs", description: "List user designs" },
        { method: "POST", path: "/designs", description: "Create a new design" }
      ],
      codeExample: `const response = await fetch('https://api.canva.com/rest/v1/users/me', {
  headers: {
    'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
  }
});
const user = await response.json();`,
      docsUrl: "https://www.canva.dev/docs/connect/"
    }
  },
  {
    id: "hubspot",
    name: "HubSpot",
    category: "CRM & Marketing",
    description: "CRM platform with marketing, sales, and service tools.",
    detailedDescription: "HubSpot provides tools for managing customer relationships and personas. Use it to track user segments, store persona data, and align your design work with marketing and sales efforts. The free CRM is a great starting point for small teams.",
    howToUse: [
      "Create a free HubSpot CRM account",
      "Set up contact properties to match your persona attributes",
      "Create lists to segment users by persona type",
      "Use the persona tool to document user profiles",
      "Connect with marketing tools for targeted outreach"
    ],
    youtubeId: "VENocHPMGrc",
    signupUrl: "https://www.hubspot.com/products/get-started",
    signupLabel: "Get HubSpot Free",
    usedIn: ["Create Personas"],
    apiDocs: {
      authMethod: "Bearer Token - Create a private app in HubSpot for access tokens",
      baseUrl: "https://api.hubapi.com",
      endpoints: [
        { method: "GET", path: "/crm/v3/objects/contacts", description: "List all contacts" },
        { method: "POST", path: "/crm/v3/objects/contacts", description: "Create a new contact" },
        { method: "GET", path: "/crm/v3/objects/companies", description: "List all companies" }
      ],
      codeExample: `const response = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
  headers: {
    'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
    'Content-Type': 'application/json'
  }
});
const contacts = await response.json();`,
      docsUrl: "https://developers.hubspot.com/docs/api/overview"
    }
  },
  {
    id: "lucidchart",
    name: "Lucidchart",
    category: "Diagramming",
    description: "Intelligent diagramming for flowcharts and process maps.",
    detailedDescription: "Lucidchart is a visual workspace for diagramming, data visualization, and collaboration. Create user flows, system diagrams, and journey maps with ease. Its extensive shape library and smart connectors make complex diagrams simple.",
    howToUse: [
      "Sign up and choose a diagram type to start",
      "Drag shapes from the library onto the canvas",
      "Connect shapes with smart lines and arrows",
      "Add text, colors, and formatting to enhance clarity",
      "Collaborate in real-time and export diagrams"
    ],
    youtubeId: "5EWRv7nuNVE",
    signupUrl: "https://www.lucidchart.com/pages/signup",
    signupLabel: "Try Lucidchart Free",
    usedIn: ["Journey Maps"],
    apiDocs: {
      authMethod: "OAuth 2.0 - Use Lucid Developer Portal for app credentials",
      baseUrl: "https://api.lucid.co",
      endpoints: [
        { method: "GET", path: "/documents", description: "List all documents" },
        { method: "GET", path: "/documents/{documentId}", description: "Get document details" },
        { method: "POST", path: "/documents", description: "Create a new document" }
      ],
      codeExample: `const response = await fetch('https://api.lucid.co/documents', {
  headers: {
    'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
    'Lucid-Api-Version': '1'
  }
});
const documents = await response.json();`,
      docsUrl: "https://developer.lucid.co/api-reference/"
    }
  },
  {
    id: "smaply",
    name: "Smaply",
    category: "Journey Mapping",
    description: "Professional tool for journey maps, personas, and stakeholder maps.",
    detailedDescription: "Smaply is purpose-built for customer experience professionals. Create beautiful journey maps, personas, and stakeholder maps with professional templates. Perfect for service design and customer experience teams.",
    howToUse: [
      "Create an account and start a new journey map",
      "Define stages and add lanes for different data types",
      "Add touchpoints, emotions, and pain points",
      "Link personas to journey maps for context",
      "Export as images or PDFs for presentations"
    ],
    youtubeId: "wFPjKD91l_g",
    signupUrl: "https://www.smaply.com/",
    signupLabel: "Start Journey Mapping",
    usedIn: ["Journey Maps"],
    apiDocs: {
      authMethod: "No public API - Use export and embed features",
      baseUrl: "N/A",
      endpoints: [],
      codeExample: `// Smaply does not offer a public REST API
// Use export features (PDF, PNG) and embed codes
// Visit the official documentation for integration guides`,
      docsUrl: "https://www.smaply.com/help"
    }
  },
  {
    id: "balsamiq",
    name: "Balsamiq",
    category: "Wireframing",
    description: "Rapid wireframing tool with a sketch-like feel.",
    detailedDescription: "Balsamiq creates low-fidelity wireframes that look hand-drawn, keeping focus on structure rather than visual design. Its simplicity encourages faster iteration and more honest feedback. Perfect for early-stage concept exploration.",
    howToUse: [
      "Download Balsamiq or use the cloud version",
      "Drag and drop UI components from the library",
      "Arrange elements to create rough layouts",
      "Use the sketch style to keep focus on structure",
      "Export as PNG or PDF for sharing"
    ],
    youtubeId: "b4-0X8MEZHI",
    signupUrl: "https://balsamiq.cloud/",
    signupLabel: "Try Balsamiq Free",
    usedIn: ["Lo-Fi Wireframes"],
    apiDocs: {
      authMethod: "No public API - Use Balsamiq Cloud sharing and export",
      baseUrl: "N/A",
      endpoints: [],
      codeExample: `// Balsamiq does not offer a public REST API
// Use Balsamiq Cloud for sharing and collaboration
// Export wireframes as PNG or PDF for integration`,
      docsUrl: "https://balsamiq.com/wireframes/cloud/docs/"
    }
  },
  {
    id: "whimsical",
    name: "Whimsical",
    category: "Visual Collaboration",
    description: "Unified workspace for flowcharts, wireframes, and mind maps.",
    detailedDescription: "Whimsical combines flowcharts, wireframes, mind maps, and documents in one beautiful tool. Its polished interface and smart features make it ideal for quick wireframing and visual thinking exercises.",
    howToUse: [
      "Create a free Whimsical account",
      "Choose wireframes, flowcharts, or mind maps",
      "Use the component library for rapid design",
      "Connect screens with flow arrows",
      "Share links for easy collaboration"
    ],
    youtubeId: "tz9cPkkeFbs",
    signupUrl: "https://whimsical.com/signup",
    signupLabel: "Start with Whimsical",
    usedIn: ["Lo-Fi Wireframes"],
    apiDocs: {
      authMethod: "No public API - Use embed and share features",
      baseUrl: "N/A",
      endpoints: [],
      codeExample: `// Whimsical does not offer a public REST API
// Use embed codes for integration into documentation
// Share links provide view and edit access`,
      docsUrl: "https://whimsical.com/help"
    }
  },
  {
    id: "usertesting",
    name: "UserTesting",
    category: "Usability Testing",
    description: "Get video feedback from real users in hours.",
    detailedDescription: "UserTesting connects you with real users who test your designs and provide video feedback. Watch users think aloud as they navigate your prototypes, uncovering usability issues and opportunities you might miss otherwise.",
    howToUse: [
      "Create a test with tasks and questions",
      "Choose your target audience demographics",
      "Launch the test and receive video responses",
      "Watch users navigate and share their thoughts",
      "Identify patterns and prioritize improvements"
    ],
    youtubeId: "VvlPLUCjLYw",
    signupUrl: "https://www.usertesting.com/",
    signupLabel: "Start Testing",
    usedIn: ["Concept Testing"],
    apiDocs: {
      authMethod: "API Key - Enterprise customers can request API access",
      baseUrl: "https://api.usertesting.com/v1",
      endpoints: [
        { method: "GET", path: "/tests", description: "List all tests" },
        { method: "GET", path: "/tests/{test_id}/videos", description: "Get video results for a test" },
        { method: "POST", path: "/tests", description: "Create a new test" }
      ],
      codeExample: `const response = await fetch('https://api.usertesting.com/v1/tests', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});
const tests = await response.json();`,
      docsUrl: "https://www.usertesting.com/resources/api"
    }
  },
  {
    id: "lookback",
    name: "Lookback",
    category: "User Research",
    description: "Moderated and unmoderated user research platform.",
    detailedDescription: "Lookback enables live and recorded user research sessions. Conduct moderated interviews with screen sharing, or set up unmoderated tests that participants complete on their own time. Great for remote user research.",
    howToUse: [
      "Create a research project in Lookback",
      "Set up tasks and questions for participants",
      "Invite participants or use their recruiting panel",
      "Watch live sessions or recorded playbacks",
      "Add timestamps and notes for key moments"
    ],
    youtubeId: "zGN-IoOSsYk",
    signupUrl: "https://lookback.io/",
    signupLabel: "Try Lookback",
    usedIn: ["Concept Testing"],
    apiDocs: {
      authMethod: "No public API - Use integrations and export features",
      baseUrl: "N/A",
      endpoints: [],
      codeExample: `// Lookback does not offer a public REST API
// Use Slack, Trello, and other built-in integrations
// Export recordings and insights manually`,
      docsUrl: "https://help.lookback.com/"
    }
  },
  {
    id: "optimal-workshop",
    name: "Optimal Workshop",
    category: "UX Research Tools",
    description: "Suite of tools for IA research and usability testing.",
    detailedDescription: "Optimal Workshop provides specialized tools for information architecture research. Run tree tests, card sorts, first-click tests, and surveys to validate your designs with real users. Essential for validating navigation and content structure.",
    howToUse: [
      "Choose a study type: tree test, card sort, or first-click",
      "Set up your content structure or images",
      "Create tasks for participants to complete",
      "Recruit participants or share via link",
      "Analyze results with built-in visualizations"
    ],
    youtubeId: "j6P86uQ--bI",
    signupUrl: "https://www.optimalworkshop.com/",
    signupLabel: "Start Free Trial",
    usedIn: ["Concept Testing"],
    apiDocs: {
      authMethod: "API Key - Available on Team and Enterprise plans",
      baseUrl: "https://api.optimalworkshop.com/v1",
      endpoints: [
        { method: "GET", path: "/studies", description: "List all studies" },
        { method: "GET", path: "/studies/{study_id}/results", description: "Get study results" },
        { method: "GET", path: "/studies/{study_id}/participants", description: "Get participant data" }
      ],
      codeExample: `const response = await fetch('https://api.optimalworkshop.com/v1/studies', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
});
const studies = await response.json();`,
      docsUrl: "https://www.optimalworkshop.com/api/"
    }
  },
  {
    id: "optimalsort",
    name: "OptimalSort",
    category: "Card Sorting",
    description: "Online card sorting tool for information architecture.",
    detailedDescription: "OptimalSort helps you understand how users categorize information. Run open or closed card sorts to validate your navigation structure and content organization. Essential for creating intuitive information architecture.",
    howToUse: [
      "Create cards representing your content items",
      "Choose open (users create categories) or closed (predefined categories)",
      "Recruit participants to sort the cards",
      "Analyze results with similarity matrices",
      "Use insights to improve your navigation"
    ],
    youtubeId: "DdGe2chQ0Zw",
    signupUrl: "https://www.optimalworkshop.com/optimalsort/",
    signupLabel: "Try OptimalSort",
    usedIn: ["Priority & Workshop"],
    apiDocs: {
      authMethod: "API Key - Part of Optimal Workshop API access",
      baseUrl: "https://api.optimalworkshop.com/v1",
      endpoints: [
        { method: "GET", path: "/optimalsort/studies", description: "List card sort studies" },
        { method: "GET", path: "/optimalsort/studies/{id}/results", description: "Get card sort results" },
        { method: "GET", path: "/optimalsort/studies/{id}/similarity-matrix", description: "Get similarity matrix data" }
      ],
      codeExample: `const response = await fetch('https://api.optimalworkshop.com/v1/optimalsort/studies', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
});
const studies = await response.json();`,
      docsUrl: "https://www.optimalworkshop.com/api/"
    }
  },
  {
    id: "mural",
    name: "Mural",
    category: "Visual Collaboration",
    description: "Digital workspace for visual collaboration.",
    detailedDescription: "Mural is a digital-first visual collaboration platform. Facilitate workshops, brainstorming sessions, and design sprints with an extensive template library. Perfect for distributed teams running collaborative exercises.",
    howToUse: [
      "Create a mural from a template or blank canvas",
      "Invite collaborators to join the session",
      "Use sticky notes, shapes, and icons to capture ideas",
      "Run voting and timer features for workshops",
      "Export or share for asynchronous review"
    ],
    youtubeId: "P5wULiWQjE0",
    signupUrl: "https://www.mural.co/",
    signupLabel: "Start with Mural",
    usedIn: ["Priority & Workshop"],
    apiDocs: {
      authMethod: "OAuth 2.0 - Create an app in MURAL Developer Portal",
      baseUrl: "https://api.mural.co/api/public/v1",
      endpoints: [
        { method: "GET", path: "/murals", description: "List all murals" },
        { method: "GET", path: "/murals/{muralId}", description: "Get mural details" },
        { method: "POST", path: "/murals/{muralId}/widgets/sticky-note", description: "Create a sticky note" }
      ],
      codeExample: `const response = await fetch('https://api.mural.co/api/public/v1/murals', {
  headers: {
    'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
  }
});
const murals = await response.json();`,
      docsUrl: "https://developers.mural.co/public/docs"
    }
  },
  {
    id: "mentimeter",
    name: "Mentimeter",
    category: "Audience Engagement",
    description: "Interactive presentations with real-time polling.",
    detailedDescription: "Mentimeter transforms presentations into interactive experiences. Add polls, quizzes, word clouds, and Q&A to engage your audience. Perfect for stakeholder workshops and gathering group feedback.",
    howToUse: [
      "Create a presentation in Mentimeter",
      "Add interactive slides like polls and word clouds",
      "Share the join code with your audience",
      "Watch responses appear in real-time",
      "Download results for further analysis"
    ],
    youtubeId: "5UXNXbJns3U",
    signupUrl: "https://www.mentimeter.com/",
    signupLabel: "Create Free Presentation",
    usedIn: ["Priority & Workshop"],
    apiDocs: {
      authMethod: "No public API - Use embed and export features",
      baseUrl: "N/A",
      endpoints: [],
      codeExample: `// Mentimeter does not offer a public REST API
// Use embed codes to display results in other platforms
// Export data as Excel or PDF from the dashboard`,
      docsUrl: "https://www.mentimeter.com/features"
    }
  },
  {
    id: "zeroheight",
    name: "Zeroheight",
    category: "Design Documentation",
    description: "Create living design system documentation.",
    detailedDescription: "Zeroheight connects your design files to create living documentation. Sync components from Figma, add code snippets, and create guidelines that stay up-to-date automatically. Essential for scaling design systems.",
    howToUse: [
      "Connect your Figma design library",
      "Create pages for different component categories",
      "Sync components to show live previews",
      "Add usage guidelines and code snippets",
      "Share with developers and designers"
    ],
    youtubeId: "T_6YyKAOBMY",
    signupUrl: "https://zeroheight.com/",
    signupLabel: "Try Zeroheight",
    usedIn: ["Design System"],
    apiDocs: {
      authMethod: "No public API - Use Figma sync and embed features",
      baseUrl: "N/A",
      endpoints: [],
      codeExample: `// Zeroheight syncs directly with Figma and Storybook
// Use built-in integrations for design system documentation
// Embed code blocks and live components automatically`,
      docsUrl: "https://zeroheight.com/help/integrations/"
    }
  },
  {
    id: "storybook",
    name: "Storybook",
    category: "Component Development",
    description: "Open-source tool for building UI components in isolation.",
    detailedDescription: "Storybook is a development environment for building, testing, and documenting UI components. Create a component library, test edge cases, and generate documentation automatically. Essential for design system implementation.",
    howToUse: [
      "Install Storybook in your project: npx storybook@latest init",
      "Create stories for each component state",
      "Add controls to interact with component props",
      "Write documentation with MDX",
      "Build and deploy your component library"
    ],
    youtubeId: "BySFuXgG-ow",
    signupUrl: "https://storybook.js.org/",
    signupLabel: "Get Started Free",
    usedIn: ["Design System"],
    apiDocs: {
      authMethod: "No authentication - Storybook runs locally or is self-hosted",
      baseUrl: "http://localhost:6006",
      endpoints: [
        { method: "GET", path: "/stories.json", description: "Get all stories metadata" },
        { method: "GET", path: "/iframe.html?id={storyId}", description: "Render a specific story" }
      ],
      codeExample: `// Storybook is a development tool, not a hosted API
// Install in your project:
// npx storybook@latest init

// Access stories programmatically via the manager API
import { addons } from '@storybook/manager-api';
const channel = addons.getChannel();`,
      docsUrl: "https://storybook.js.org/docs/react/get-started/introduction"
    }
  },
  {
    id: "sketch",
    name: "Sketch",
    category: "Design Tool",
    description: "Professional digital design toolkit for Mac.",
    detailedDescription: "Sketch is a powerful vector design tool for Mac. Create symbols, shared styles, and design systems with precision. Its plugin ecosystem extends functionality for prototyping, collaboration, and developer handoff.",
    howToUse: [
      "Download Sketch for Mac",
      "Set up artboards for your screen sizes",
      "Use symbols for reusable components",
      "Apply shared styles for consistency",
      "Export assets or use plugins for handoff"
    ],
    youtubeId: "ilcwjXTqyNM",
    signupUrl: "https://www.sketch.com/",
    signupLabel: "Try Sketch Free",
    usedIn: ["Hi-Fi Mockups"],
    apiDocs: {
      authMethod: "OAuth 2.0 - Use Sketch Cloud API with OAuth tokens",
      baseUrl: "https://api.sketch.cloud/v1",
      endpoints: [
        { method: "GET", path: "/shares/{shortId}", description: "Get shared document info" },
        { method: "GET", path: "/shares/{shortId}/versions", description: "List document versions" },
        { method: "GET", path: "/shares/{shortId}/artboards", description: "Get artboards from a share" }
      ],
      codeExample: `const response = await fetch('https://api.sketch.cloud/v1/shares/SHORT_ID', {
  headers: {
    'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
  }
});
const share = await response.json();`,
      docsUrl: "https://developer.sketch.com/"
    }
  },
  {
    id: "adobe-xd",
    name: "Adobe XD",
    category: "Design & Prototyping",
    description: "UI/UX design and prototyping tool from Adobe.",
    detailedDescription: "Adobe XD is Adobe's dedicated tool for UI/UX design. Create responsive designs, interactive prototypes, and collaborate with team members. It integrates with other Adobe Creative Cloud apps for a seamless workflow.",
    howToUse: [
      "Open Adobe XD and create a new document",
      "Set up artboards for different screens",
      "Design using vectors, text, and images",
      "Create prototypes with transition animations",
      "Share for review or developer handoff"
    ],
    youtubeId: "WEljsc2jorI",
    signupUrl: "https://www.adobe.com/products/xd.html",
    signupLabel: "Start with Adobe XD",
    usedIn: ["Hi-Fi Mockups"],
    apiDocs: {
      authMethod: "No public API - Use Creative Cloud integrations and plugins",
      baseUrl: "N/A",
      endpoints: [],
      codeExample: `// Adobe XD does not offer a public REST API
// Use the XD Plugin API for extending functionality
// https://adobexdplatform.com/plugin-docs/

const { editDocument } = require("application");
editDocument({ editLabel: "My Plugin" }, async (selection) => {
  // Plugin code here
});`,
      docsUrl: "https://adobexdplatform.com/plugin-docs/"
    }
  },
  {
    id: "protopie",
    name: "ProtoPie",
    category: "Advanced Prototyping",
    description: "Create realistic prototypes without code.",
    detailedDescription: "ProtoPie creates highly realistic prototypes with complex interactions, sensors, and multi-device experiences. Build prototypes that feel like real apps without writing code. Perfect for testing advanced micro-interactions.",
    howToUse: [
      "Import designs from Figma or Sketch",
      "Add triggers like taps, drags, and sensors",
      "Create responses with animations and logic",
      "Connect multiple devices for cross-device prototypes",
      "Test on real devices with ProtoPie Player"
    ],
    youtubeId: "fWxYWOTfuPQ",
    signupUrl: "https://www.protopie.io/",
    signupLabel: "Try ProtoPie Free",
    usedIn: ["Interactive Prototypes"],
    apiDocs: {
      authMethod: "No public API - Use ProtoPie Connect for integrations",
      baseUrl: "N/A",
      endpoints: [],
      codeExample: `// ProtoPie does not offer a public REST API
// Use ProtoPie Connect for hardware and software integrations
// Connect via WebSocket or serial communication

// ProtoPie Connect WebSocket example:
const ws = new WebSocket('ws://localhost:9981');
ws.send(JSON.stringify({ messageId: 'trigger', value: 'data' }));`,
      docsUrl: "https://www.protopie.io/learn/docs/"
    }
  },
  {
    id: "principle",
    name: "Principle",
    category: "Animation Design",
    description: "Design animated and interactive interfaces for Mac.",
    detailedDescription: "Principle makes it easy to create animated, interactive prototypes. Design fluid transitions, micro-interactions, and scroll-based animations that bring your designs to life. Perfect for communicating motion design to developers.",
    howToUse: [
      "Import designs from Sketch or Figma",
      "Create artboards for different states",
      "Add auto transitions between artboards",
      "Fine-tune timing and easing curves",
      "Record and export as video or GIF"
    ],
    youtubeId: "vFrivX021-A",
    signupUrl: "https://principleformac.com/",
    signupLabel: "Download Principle",
    usedIn: ["Interactive Prototypes"],
    apiDocs: {
      authMethod: "No public API - Desktop application for Mac only",
      baseUrl: "N/A",
      endpoints: [],
      codeExample: `// Principle is a Mac-only desktop application
// No REST API available
// Export animations as video, GIF, or native iOS code
// Use the import feature for Sketch and Figma files`,
      docsUrl: "https://principleformac.com/docs.html"
    }
  },
  {
    id: "calendly",
    name: "Calendly",
    category: "Scheduling",
    description: "Simple scheduling for user research sessions.",
    detailedDescription: "Calendly eliminates the back-and-forth of scheduling meetings. Share your availability and let participants book research sessions at times that work for everyone. Essential for coordinating user interviews and usability tests.",
    howToUse: [
      "Create event types for different session lengths",
      "Set your availability preferences",
      "Share your Calendly link with participants",
      "Integrate with Zoom for automatic meeting links",
      "Sync with your calendar to avoid conflicts"
    ],
    youtubeId: "xFCKEVfqr6E",
    signupUrl: "https://calendly.com/signup",
    signupLabel: "Get Calendly Free",
    usedIn: ["Test Scheduling"],
    apiDocs: {
      authMethod: "Bearer Token - Generate Personal Access Token from Calendly integrations",
      baseUrl: "https://api.calendly.com",
      endpoints: [
        { method: "GET", path: "/users/me", description: "Get current user info" },
        { method: "GET", path: "/event_types", description: "List all event types" },
        { method: "GET", path: "/scheduled_events", description: "List scheduled events" }
      ],
      codeExample: `const response = await fetch('https://api.calendly.com/users/me', {
  headers: {
    'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
    'Content-Type': 'application/json'
  }
});
const user = await response.json();`,
      docsUrl: "https://developer.calendly.com/api-docs"
    }
  },
  {
    id: "zoom",
    name: "Zoom",
    category: "Video Conferencing",
    description: "Video meetings for remote user research.",
    detailedDescription: "Zoom is the standard for video meetings and remote user research. Conduct moderated usability tests, user interviews, and stakeholder presentations with screen sharing and recording capabilities.",
    howToUse: [
      "Schedule a meeting with recording enabled",
      "Share the meeting link with participants",
      "Use screen share for prototype testing",
      "Record the session for later analysis",
      "Use the waiting room to manage participants"
    ],
    youtubeId: "9guqRELB4dg",
    signupUrl: "https://zoom.us/signup",
    signupLabel: "Sign Up for Zoom",
    usedIn: ["Test Scheduling"],
    apiDocs: {
      authMethod: "OAuth 2.0 or Server-to-Server OAuth - Create an app in Zoom Marketplace",
      baseUrl: "https://api.zoom.us/v2",
      endpoints: [
        { method: "GET", path: "/users/me", description: "Get current user info" },
        { method: "POST", path: "/users/{userId}/meetings", description: "Create a meeting" },
        { method: "GET", path: "/users/{userId}/recordings", description: "List user recordings" }
      ],
      codeExample: `const response = await fetch('https://api.zoom.us/v2/users/me', {
  headers: {
    'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
  }
});
const user = await response.json();`,
      docsUrl: "https://developers.zoom.us/docs/api/"
    }
  },
  {
    id: "loom",
    name: "Loom",
    category: "Video Recording",
    description: "Async video for quick feedback and walkthroughs.",
    detailedDescription: "Loom makes it easy to record quick video messages. Share design walkthroughs, provide feedback, or explain complex features asynchronously. Perfect for distributed teams and stakeholder communication.",
    howToUse: [
      "Install the Loom browser extension or desktop app",
      "Click to start recording your screen and camera",
      "Walk through your designs while narrating",
      "Share the video link instantly",
      "Viewers can leave timestamped comments"
    ],
    youtubeId: "CfZvb0D5qwE",
    signupUrl: "https://www.loom.com/signup",
    signupLabel: "Get Loom Free",
    usedIn: ["Test Scheduling"],
    apiDocs: {
      authMethod: "Bearer Token - Generate Developer API key from Loom settings",
      baseUrl: "https://api.loom.com",
      endpoints: [
        { method: "GET", path: "/v1/videos", description: "List all videos" },
        { method: "GET", path: "/v1/videos/{id}", description: "Get video details" },
        { method: "POST", path: "/v1/videos/{id}/transcriptions", description: "Get video transcript" }
      ],
      codeExample: `const response = await fetch('https://api.loom.com/v1/videos', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});
const videos = await response.json();`,
      docsUrl: "https://dev.loom.com/docs/api-reference"
    }
  },
  {
    id: "abstract",
    name: "Abstract",
    category: "Design Version Control",
    description: "Version control and collaboration for Sketch.",
    detailedDescription: "Abstract brings Git-like version control to design. Track changes, create branches, review designs, and merge with confidence. Essential for teams working on complex design projects with multiple contributors.",
    howToUse: [
      "Create a project and import your Sketch files",
      "Create branches for new features",
      "Commit changes with descriptive messages",
      "Request reviews from team members",
      "Merge approved changes to main"
    ],
    youtubeId: "e5jz3lKqU6k",
    signupUrl: "https://www.abstract.com/",
    signupLabel: "Try Abstract",
    usedIn: ["Version Control"],
    apiDocs: {
      authMethod: "Bearer Token - Generate API token from Abstract settings",
      baseUrl: "https://api.abstract.com",
      endpoints: [
        { method: "GET", path: "/projects", description: "List all projects" },
        { method: "GET", path: "/projects/{projectId}/branches", description: "List project branches" },
        { method: "GET", path: "/projects/{projectId}/commits", description: "List project commits" }
      ],
      codeExample: `const response = await fetch('https://api.abstract.com/projects', {
  headers: {
    'Authorization': 'Bearer YOUR_API_TOKEN',
    'Abstract-Api-Version': '2020-01-01'
  }
});
const projects = await response.json();`,
      docsUrl: "https://sdk.abstract.com/"
    }
  },
  {
    id: "github",
    name: "GitHub",
    category: "Code & Collaboration",
    description: "Development platform for version control and collaboration.",
    detailedDescription: "GitHub is the world's leading software development platform. While primarily for code, it's increasingly used for design systems, documentation, and design-developer collaboration. Essential for design handoff workflows.",
    howToUse: [
      "Create a repository for your project",
      "Add design assets and documentation",
      "Use issues to track design tasks",
      "Create pull requests for design reviews",
      "Connect with design tools via integrations"
    ],
    youtubeId: "iv8rSLsi1xo",
    signupUrl: "https://github.com/signup",
    signupLabel: "Join GitHub Free",
    usedIn: ["Version Control"],
    apiDocs: {
      authMethod: "Bearer Token - Generate Personal Access Token from GitHub settings",
      baseUrl: "https://api.github.com",
      endpoints: [
        { method: "GET", path: "/repos/{owner}/{repo}", description: "Get repository info" },
        { method: "GET", path: "/repos/{owner}/{repo}/issues", description: "List repository issues" },
        { method: "POST", path: "/repos/{owner}/{repo}/issues", description: "Create an issue" }
      ],
      codeExample: `const response = await fetch('https://api.github.com/repos/owner/repo', {
  headers: {
    'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
    'Accept': 'application/vnd.github.v3+json'
  }
});
const repo = await response.json();`,
      docsUrl: "https://docs.github.com/en/rest"
    }
  },
  {
    id: "zeplin",
    name: "Zeplin",
    category: "Design Handoff",
    description: "Handoff designs to developers with specs and assets.",
    detailedDescription: "Zeplin bridges the gap between design and development. Export designs with accurate specs, CSS snippets, and downloadable assets. Developers get everything they need without bothering designers for measurements.",
    howToUse: [
      "Install the Zeplin plugin for Figma or Sketch",
      "Export screens to your Zeplin project",
      "Developers inspect specs by clicking elements",
      "Download assets in required formats",
      "Add notes and links for additional context"
    ],
    youtubeId: "x1RPNvlOF8k",
    signupUrl: "https://zeplin.io/",
    signupLabel: "Start with Zeplin",
    usedIn: ["Developer Handoff"],
    apiDocs: {
      authMethod: "Bearer Token - Generate Personal Access Token from Zeplin account",
      baseUrl: "https://api.zeplin.dev/v1",
      endpoints: [
        { method: "GET", path: "/projects", description: "List all projects" },
        { method: "GET", path: "/projects/{project_id}/screens", description: "List screens in a project" },
        { method: "GET", path: "/projects/{project_id}/components", description: "List project components" }
      ],
      codeExample: `const response = await fetch('https://api.zeplin.dev/v1/projects', {
  headers: {
    'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
  }
});
const projects = await response.json();`,
      docsUrl: "https://docs.zeplin.dev/"
    }
  },
  {
    id: "avocode",
    name: "Avocode",
    category: "Design Handoff",
    description: "Open designs and export code without design tools.",
    detailedDescription: "Avocode lets developers open design files without installing design software. Get CSS, Swift, or Android XML code from any design element. Works with Figma, Sketch, XD, and Photoshop files.",
    howToUse: [
      "Upload design files to Avocode",
      "Developers inspect without design tools",
      "Copy CSS or native code for elements",
      "Export assets in any format and resolution",
      "Add comments for design-dev communication"
    ],
    youtubeId: "E5p5I0lbsVo",
    signupUrl: "https://avocode.com/",
    signupLabel: "Try Avocode Free",
    usedIn: ["Developer Handoff"],
    apiDocs: {
      authMethod: "No public API - Use export and share features",
      baseUrl: "N/A",
      endpoints: [],
      codeExample: `// Avocode does not offer a public REST API
// Use the desktop app to open and export designs
// Integrates with Slack for notifications`,
      docsUrl: "https://help.avocode.com/"
    }
  },
  {
    id: "jira",
    name: "Jira",
    category: "Project Management",
    description: "Issue tracking and project management for teams.",
    detailedDescription: "Jira is the standard for agile project management. Track design tasks, manage sprints, and collaborate with development teams. Create custom workflows that match your design process.",
    howToUse: [
      "Create a project for your design work",
      "Add issues for each design task",
      "Set up a Kanban or Scrum board",
      "Link issues to designs in Figma",
      "Track progress through workflows"
    ],
    youtubeId: "GWxMTvRGIpc",
    signupUrl: "https://www.atlassian.com/software/jira/free",
    signupLabel: "Get Jira Free",
    usedIn: ["QA Integration"],
    apiDocs: {
      authMethod: "Bearer Token or Basic Auth - Create API token from Atlassian account",
      baseUrl: "https://your-domain.atlassian.net/rest/api/3",
      endpoints: [
        { method: "GET", path: "/issue/{issueIdOrKey}", description: "Get issue details" },
        { method: "POST", path: "/issue", description: "Create a new issue" },
        { method: "GET", path: "/search", description: "Search for issues using JQL" }
      ],
      codeExample: `const response = await fetch('https://your-domain.atlassian.net/rest/api/3/issue/PROJ-123', {
  headers: {
    'Authorization': 'Basic ' + btoa('email@example.com:YOUR_API_TOKEN'),
    'Accept': 'application/json'
  }
});
const issue = await response.json();`,
      docsUrl: "https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/"
    }
  },
  {
    id: "trello",
    name: "Trello",
    category: "Kanban Boards",
    description: "Visual Kanban boards for task management.",
    detailedDescription: "Trello's simple Kanban boards make it easy to track design tasks. Drag cards between lists to update status, attach designs, and add checklists. Perfect for smaller teams or simpler workflows.",
    howToUse: [
      "Create a board for your design project",
      "Add lists for workflow stages (To Do, In Progress, Done)",
      "Create cards for individual tasks",
      "Attach design files and add descriptions",
      "Move cards as work progresses"
    ],
    youtubeId: "xky48zyL9iA",
    signupUrl: "https://trello.com/signup",
    signupLabel: "Start with Trello",
    usedIn: ["QA Integration"],
    apiDocs: {
      authMethod: "API Key + Token - Generate from Trello Developer Portal",
      baseUrl: "https://api.trello.com/1",
      endpoints: [
        { method: "GET", path: "/boards/{id}", description: "Get board details" },
        { method: "GET", path: "/boards/{id}/cards", description: "List cards on a board" },
        { method: "POST", path: "/cards", description: "Create a new card" }
      ],
      codeExample: `const response = await fetch(
  'https://api.trello.com/1/boards/BOARD_ID?key=YOUR_API_KEY&token=YOUR_TOKEN'
);
const board = await response.json();`,
      docsUrl: "https://developer.atlassian.com/cloud/trello/rest/"
    }
  },
  {
    id: "asana",
    name: "Asana",
    category: "Work Management",
    description: "Work management platform for tracking projects.",
    detailedDescription: "Asana helps teams organize and track work across projects. Create tasks, set dependencies, and visualize work in lists, boards, or timeline views. Great for cross-functional design and development collaboration.",
    howToUse: [
      "Create a project with sections for workflow stages",
      "Add tasks with assignees and due dates",
      "Set dependencies between tasks",
      "Use the timeline view for planning",
      "Integrate with design tools for updates"
    ],
    youtubeId: "VG5KV2Gg8sA",
    signupUrl: "https://asana.com/create-account",
    signupLabel: "Try Asana Free",
    usedIn: ["QA Integration"],
    apiDocs: {
      authMethod: "Bearer Token - Generate Personal Access Token from Asana settings",
      baseUrl: "https://app.asana.com/api/1.0",
      endpoints: [
        { method: "GET", path: "/users/me", description: "Get current user info" },
        { method: "GET", path: "/projects/{project_gid}/tasks", description: "List tasks in a project" },
        { method: "POST", path: "/tasks", description: "Create a new task" }
      ],
      codeExample: `const response = await fetch('https://app.asana.com/api/1.0/users/me', {
  headers: {
    'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
  }
});
const user = await response.json();`,
      docsUrl: "https://developers.asana.com/docs/overview"
    }
  },
  {
    id: "maze",
    name: "Maze",
    category: "Usability Testing",
    description: "Rapid testing for prototypes and designs.",
    detailedDescription: "Maze turns your prototypes into actionable insights. Run unmoderated usability tests, measure task completion, and collect user feedback at scale. Get results in hours instead of weeks.",
    howToUse: [
      "Connect your Figma or InVision prototype",
      "Define tasks for users to complete",
      "Set up follow-up questions",
      "Share the test link with participants",
      "Analyze success rates and heatmaps"
    ],
    youtubeId: "5UOWUEC_H4c",
    signupUrl: "https://maze.co/",
    signupLabel: "Start Testing with Maze",
    usedIn: ["Analytics & Feedback"],
    apiDocs: {
      authMethod: "API Key - Available on Organization plans",
      baseUrl: "https://api.maze.co/v1",
      endpoints: [
        { method: "GET", path: "/mazes", description: "List all mazes (tests)" },
        { method: "GET", path: "/mazes/{maze_id}/results", description: "Get test results" },
        { method: "GET", path: "/mazes/{maze_id}/missions", description: "Get tasks/missions in a test" }
      ],
      codeExample: `const response = await fetch('https://api.maze.co/v1/mazes', {
  headers: {
    'X-Api-Key': 'YOUR_API_KEY'
  }
});
const mazes = await response.json();`,
      docsUrl: "https://developers.maze.co/"
    }
  },
  {
    id: "hotjar",
    name: "Hotjar",
    category: "Behavior Analytics",
    description: "Heatmaps and recordings to understand user behavior.",
    detailedDescription: "Hotjar reveals how users interact with your product through heatmaps, session recordings, and feedback polls. See where users click, scroll, and drop off. Essential for data-driven design decisions.",
    howToUse: [
      "Install the Hotjar tracking code",
      "Set up heatmaps for key pages",
      "Watch session recordings to see user behavior",
      "Add feedback widgets to collect input",
      "Analyze data to identify usability issues"
    ],
    youtubeId: "xqTfJH8L0HU",
    signupUrl: "https://www.hotjar.com/",
    signupLabel: "Get Hotjar Free",
    usedIn: ["Analytics & Feedback"],
    apiDocs: {
      authMethod: "API Key - Available on Business and Scale plans",
      baseUrl: "https://api.hotjar.com",
      endpoints: [
        { method: "GET", path: "/v1/sites/{site_id}/heatmaps", description: "List heatmaps for a site" },
        { method: "GET", path: "/v1/sites/{site_id}/recordings", description: "List session recordings" },
        { method: "GET", path: "/v1/sites/{site_id}/feedback", description: "Get feedback responses" }
      ],
      codeExample: `const response = await fetch('https://api.hotjar.com/v1/sites/SITE_ID/heatmaps', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
});
const heatmaps = await response.json();`,
      docsUrl: "https://help.hotjar.com/hc/en-us/articles/360056546854-Hotjar-API"
    }
  },
  {
    id: "optimizely",
    name: "Optimizely",
    category: "Experimentation",
    description: "A/B testing and experimentation platform.",
    detailedDescription: "Optimizely enables data-driven design decisions through A/B testing. Test design variations, measure impact on key metrics, and roll out winning designs with confidence. Essential for optimizing conversion and engagement.",
    howToUse: [
      "Create an experiment for your hypothesis",
      "Set up variations of your design",
      "Define success metrics to track",
      "Run the experiment with real users",
      "Analyze results and implement winners"
    ],
    youtubeId: "Bxj0wKOsmnk",
    signupUrl: "https://www.optimizely.com/",
    signupLabel: "Start Experimenting",
    usedIn: ["Analytics & Feedback"],
    apiDocs: {
      authMethod: "Bearer Token - Generate Personal Access Token from Optimizely settings",
      baseUrl: "https://api.optimizely.com/v2",
      endpoints: [
        { method: "GET", path: "/experiments", description: "List all experiments" },
        { method: "GET", path: "/experiments/{experiment_id}/results", description: "Get experiment results" },
        { method: "POST", path: "/experiments", description: "Create a new experiment" }
      ],
      codeExample: `const response = await fetch('https://api.optimizely.com/v2/experiments', {
  headers: {
    'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
  }
});
const experiments = await response.json();`,
      docsUrl: "https://docs.developers.optimizely.com/web-experimentation/reference"
    }
  },
  {
    id: "confluence",
    name: "Confluence",
    category: "Documentation",
    description: "Team wiki and documentation workspace.",
    detailedDescription: "Confluence is Atlassian's team documentation platform. Create design specs, process documentation, and knowledge bases. Integrates seamlessly with Jira for connected project management.",
    howToUse: [
      "Create a space for your design team",
      "Use templates for common document types",
      "Embed Figma designs and prototypes",
      "Create page hierarchies for organization",
      "Link to Jira issues for context"
    ],
    youtubeId: "J1OneTYc_TI",
    signupUrl: "https://www.atlassian.com/software/confluence/free",
    signupLabel: "Get Confluence Free",
    usedIn: ["Design Documentation"],
    apiDocs: {
      authMethod: "Bearer Token or Basic Auth - Create API token from Atlassian account",
      baseUrl: "https://your-domain.atlassian.net/wiki/rest/api",
      endpoints: [
        { method: "GET", path: "/content", description: "List all content" },
        { method: "GET", path: "/content/{id}", description: "Get specific page content" },
        { method: "POST", path: "/content", description: "Create new page" }
      ],
      codeExample: `const response = await fetch('https://your-domain.atlassian.net/wiki/rest/api/content', {
  headers: {
    'Authorization': 'Basic ' + btoa('email@example.com:YOUR_API_TOKEN'),
    'Accept': 'application/json'
  }
});
const content = await response.json();`,
      docsUrl: "https://developer.atlassian.com/cloud/confluence/rest/v1/intro/"
    }
  },
  {
    id: "gitbook",
    name: "GitBook",
    category: "Documentation",
    description: "Modern documentation platform for teams.",
    detailedDescription: "GitBook creates beautiful, searchable documentation. Sync with GitHub, embed designs, and create public or private docs. Perfect for design system documentation and team knowledge bases.",
    howToUse: [
      "Create a space for your documentation",
      "Write content in the visual editor",
      "Organize with page groups and subpages",
      "Embed Figma designs and videos",
      "Publish publicly or keep private"
    ],
    youtubeId: "inyY0U2RBuM",
    signupUrl: "https://www.gitbook.com/",
    signupLabel: "Start with GitBook",
    usedIn: ["Design Documentation"],
    apiDocs: {
      authMethod: "Bearer Token - Generate API token from GitBook settings",
      baseUrl: "https://api.gitbook.com/v1",
      endpoints: [
        { method: "GET", path: "/spaces", description: "List all spaces" },
        { method: "GET", path: "/spaces/{spaceId}/content", description: "Get space content" },
        { method: "POST", path: "/spaces/{spaceId}/content/page", description: "Create a new page" }
      ],
      codeExample: `const response = await fetch('https://api.gitbook.com/v1/spaces', {
  headers: {
    'Authorization': 'Bearer YOUR_API_TOKEN'
  }
});
const spaces = await response.json();`,
      docsUrl: "https://developer.gitbook.com/gitbook-api/reference"
    }
  }
];

export function getIntegrationById(id: string): IntegrationTool | undefined {
  return integrationTools.find(tool => tool.id === id);
}

export interface UXAutomationTool {
  id: string;
  name: string;
  description: string;
  category: "wireframing" | "ui-generation" | "prototyping" | "research" | "testing" | "copywriting";
  url: string;
  gptUrl?: string;
  features: string[];
  pricing: string;
}

export const uxAutomationTools: UXAutomationTool[] = [
  {
    id: "relume",
    name: "Relume",
    description: "AI-powered sitemap and wireframe generator with 1,000+ components",
    category: "wireframing",
    url: "https://www.relume.io/",
    gptUrl: "https://chatgpt.com/g/g-EJQjr3clF-relume-ai-website-builder",
    features: ["AI sitemap generation", "Wireframe builder", "Figma & Webflow export", "AI copywriting"],
    pricing: "Free tier / $32/mo"
  },
  {
    id: "ux-pilot",
    name: "UX Pilot",
    description: "UX research and wireframing with usability audits and high-fidelity UI generation",
    category: "wireframing",
    url: "https://uxpilot.ai/",
    features: ["Wireframe generation", "Usability audits", "High-fidelity UI", "Interview generator"],
    pricing: "Free tier available"
  },
  {
    id: "uizard",
    name: "Uizard",
    description: "Convert hand-drawn sketches and screenshots into polished digital designs",
    category: "ui-generation",
    url: "https://uizard.io/",
    features: ["Sketch-to-UI", "Screenshot-to-theme", "AI templates", "Real-time collaboration"],
    pricing: "Free / $12/mo"
  },
  {
    id: "galileo-ai",
    name: "Galileo AI",
    description: "Generate pixel-perfect, high-fidelity UI designs from text descriptions",
    category: "ui-generation",
    url: "https://usegalileo.ai/",
    features: ["Text-to-UI", "Design system integration", "Figma export", "Responsive layouts"],
    pricing: "Waitlist / Paid"
  },
  {
    id: "framer-ai",
    name: "Framer AI",
    description: "Generate entire website layouts, interactions, and optimized user flows from prompts",
    category: "prototyping",
    url: "https://framer.com/",
    features: ["AI layout generation", "Interaction suggestions", "User flow optimization", "React export"],
    pricing: "Free tier / Paid"
  },
  {
    id: "figma-ai",
    name: "Figma AI",
    description: "AI-powered plugins and features inside Figma for automated design tasks",
    category: "ui-generation",
    url: "https://figma.com/",
    features: ["Magician plugin", "Wireframe Designer", "AI content fill", "First Draft"],
    pricing: "Free (plugins vary)"
  },
  {
    id: "maze",
    name: "Maze",
    description: "Test interactive prototypes with AI-powered feedback analysis",
    category: "testing",
    url: "https://maze.co/",
    features: ["Prototype testing", "User path analysis", "Tree testing", "AI feedback theming"],
    pricing: "Free tier / Paid"
  },
  {
    id: "adobe-firefly",
    name: "Adobe Firefly",
    description: "Generative AI for visual assets including fill, cropping, and content generation",
    category: "ui-generation",
    url: "https://adobe.com/products/firefly.html",
    features: ["Generative fill", "Smart cropping", "Content generation", "Creative Cloud integration"],
    pricing: "$20.99/mo (CC)"
  },
  {
    id: "midjourney",
    name: "Midjourney",
    description: "High-quality AI image generation for mood boards, concept art, and visual assets",
    category: "ui-generation",
    url: "https://midjourney.com/",
    features: ["Text-to-image", "Style variations", "Mood boards", "Brand visuals"],
    pricing: "$10/mo"
  },
  {
    id: "chatgpt-ux",
    name: "ChatGPT for UX",
    description: "AI assistant for UX copy, personas, research synthesis, and ideation",
    category: "copywriting",
    url: "https://chat.openai.com/",
    features: ["UX copywriting", "Persona generation", "Research synthesis", "Brainstorming"],
    pricing: "Free / $20/mo"
  },
  {
    id: "writer",
    name: "Writer",
    description: "AI writing platform with brand voice consistency and UX microcopy generation",
    category: "copywriting",
    url: "https://writer.com/",
    features: ["Brand voice AI", "Microcopy generation", "Style guide enforcement", "Team collaboration"],
    pricing: "Free tier / Paid"
  },
  {
    id: "visily",
    name: "Visily",
    description: "AI-powered wireframe and mockup tool with screenshot-to-design capabilities",
    category: "wireframing",
    url: "https://www.visily.ai/",
    features: ["Screenshot to design", "AI wireframing", "Sketch to mockup", "Template library"],
    pricing: "Free tier / Paid"
  }
];

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
