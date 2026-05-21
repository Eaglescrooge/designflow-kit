import { Users, Sparkles, Layers, FlaskConical, BarChart3, Brain, Map, PenTool, MessageSquare, GitBranch } from "lucide-react";
import type { WorkflowTool, WorkflowCategory } from "@/components/workflow-tools-panel";

export const PERSONAS_TOOLS: WorkflowTool[] = [
  { id: "qoqo-persona", name: "QoQo.ai", tagline: "AI persona generator (Figma)", description: "Generate detailed user personas complete with goals, pain points, and behaviours. Figma plugin used by 95k+ designers.", freeLabel: "Free trial", url: "https://www.figma.com/community/plugin/1189158575928509194/QoQo", color: "text-violet-600", bg: "bg-violet-500/10 border-violet-500/20", emoji: "🧠", category: "ai" },
  { id: "hubspot-persona", name: "Make My Persona", tagline: "HubSpot's persona builder", description: "Step-by-step guided persona creation wizard. Export polished persona documents for free — no account needed.", freeLabel: "Free", url: "https://www.hubspot.com/make-my-persona", color: "text-orange-600", bg: "bg-orange-500/10 border-orange-500/20", emoji: "🧑‍💼", category: "ai" },
  { id: "userpersona", name: "UserPersona.dev", tagline: "AI persona generator", description: "Generate a full persona from a short description using GPT. Great for proto-personas early in a project.", freeLabel: "Free", url: "https://userpersona.dev", color: "text-blue-600", bg: "bg-blue-500/10 border-blue-500/20", emoji: "⚡", category: "ai" },
  { id: "crystal", name: "Crystal", tagline: "Personality & behaviour AI", description: "Predict personality types and communication styles for users or stakeholders. Useful for behavioural persona layers.", freeLabel: "Free trial", url: "https://www.crystalknows.com", color: "text-teal-600", bg: "bg-teal-500/10 border-teal-500/20", emoji: "💎", category: "ai" },
  { id: "xtensio", name: "Xtensio", tagline: "Persona templates", description: "Beautiful, editable persona templates. Free tier lets you build and share persona documents with your team.", freeLabel: "Free tier", url: "https://xtensio.com/user-persona", color: "text-pink-600", bg: "bg-pink-500/10 border-pink-500/20", emoji: "📋", category: "templates" },
  { id: "dovetail-persona", name: "Dovetail", tagline: "Research-backed personas", description: "Tag and synthesise research notes to surface the real patterns behind your personas. Free plan included.", freeLabel: "Free plan", url: "https://dovetail.com", color: "text-rose-600", bg: "bg-rose-500/10 border-rose-500/20", emoji: "📂", category: "research" },
];

export const PERSONAS_CATEGORIES: WorkflowCategory[] = [
  { key: "ai", label: "AI Generators", icon: Brain },
  { key: "templates", label: "Templates", icon: Layers },
  { key: "research", label: "Research Repo", icon: Sparkles },
];

export const JOURNEY_MAPS_TOOLS: WorkflowTool[] = [
  { id: "qoqo-journey", name: "QoQo.ai", tagline: "AI journey map generator", description: "Generate journey maps with touchpoints, emotions, and opportunities directly inside Figma. Fast and research-backed.", freeLabel: "Free trial", url: "https://www.figma.com/community/plugin/1189158575928509194/QoQo", color: "text-violet-600", bg: "bg-violet-500/10 border-violet-500/20", emoji: "🧠", category: "ai" },
  { id: "uxpressia", name: "UXPressia", tagline: "Journey mapping platform", description: "Build multi-persona journey maps with emotion curves, channels, and backstage processes. Free tier available.", freeLabel: "Free tier", url: "https://uxpressia.com", color: "text-blue-600", bg: "bg-blue-500/10 border-blue-500/20", emoji: "🗺️", category: "mapping" },
  { id: "miro-journey", name: "Miro", tagline: "Collaborative journey canvas", description: "Use Miro's journey map templates on a real-time collaborative whiteboard. Ideal for remote team workshops.", freeLabel: "Free tier", url: "https://miro.com/templates/customer-journey-map/", color: "text-yellow-600", bg: "bg-yellow-500/10 border-yellow-500/20", emoji: "🖼️", category: "mapping" },
  { id: "smaply", name: "Smaply", tagline: "Service design mapping", description: "Create journey maps, personas, and service blueprints. Includes stakeholder maps and channel visualisations.", freeLabel: "Free trial", url: "https://www.smaply.com", color: "text-green-600", bg: "bg-green-500/10 border-green-500/20", emoji: "🔗", category: "mapping" },
  { id: "custellence", name: "Custellence", tagline: "Customer journey software", description: "Drag-and-drop journey map builder with sentiment curves. Designed specifically for CX and service design teams.", freeLabel: "Free trial", url: "https://custellence.com", color: "text-teal-600", bg: "bg-teal-500/10 border-teal-500/20", emoji: "📈", category: "mapping" },
  { id: "lucidchart-journey", name: "Lucidchart", tagline: "Diagramming & flowcharts", description: "Build detailed process flows and journey diagrams. Free tier supports up to 3 editable documents.", freeLabel: "Free tier", url: "https://www.lucidchart.com", color: "text-orange-600", bg: "bg-orange-500/10 border-orange-500/20", emoji: "📊", category: "diagramming" },
];

export const JOURNEY_MAPS_CATEGORIES: WorkflowCategory[] = [
  { key: "ai", label: "AI Tools", icon: Brain },
  { key: "mapping", label: "Journey Mapping", icon: Map },
  { key: "diagramming", label: "Diagramming", icon: GitBranch },
];

export const WIREFRAMES_TOOLS: WorkflowTool[] = [
  { id: "uizard", name: "Uizard", tagline: "AI wireframe generator", description: "Turn rough sketches or text descriptions into wireframes and prototypes in seconds with generative AI.", freeLabel: "Free tier", url: "https://uizard.io", color: "text-violet-600", bg: "bg-violet-500/10 border-violet-500/20", emoji: "✨", category: "ai" },
  { id: "galileo", name: "Galileo AI", tagline: "Text-to-UI generator", description: "Generate full UI designs from a text prompt. Output to Figma directly. Great for rapid concept generation.", freeLabel: "Free beta", url: "https://www.usegalileo.ai", color: "text-blue-600", bg: "bg-blue-500/10 border-blue-500/20", emoji: "🚀", category: "ai" },
  { id: "penpot", name: "Penpot", tagline: "Open-source design tool", description: "Free, self-hostable design and prototyping tool. Web-based with real-time collaboration and SVG-native output.", freeLabel: "Free & open source", url: "https://penpot.app", color: "text-teal-600", bg: "bg-teal-500/10 border-teal-500/20", emoji: "🐾", category: "design" },
  { id: "wireframe-cc", name: "Wireframe.cc", tagline: "Minimal wireframing tool", description: "Ultra-simple browser-based wireframing. Start drawing in seconds with no signup. Perfect for quick lo-fi ideas.", freeLabel: "Free", url: "https://wireframe.cc", color: "text-gray-600", bg: "bg-gray-500/10 border-gray-500/20", emoji: "📐", category: "lo-fi" },
  { id: "moqups", name: "Moqups", tagline: "Online wireframing & mockups", description: "Drag-and-drop wireframe builder with pre-built UI components. Free plan includes 1 project and 200 objects.", freeLabel: "Free tier", url: "https://moqups.com", color: "text-green-600", bg: "bg-green-500/10 border-green-500/20", emoji: "🧱", category: "lo-fi" },
  { id: "balsamiq", name: "Balsamiq", tagline: "Lo-fi wireframing classic", description: "Sketchy-style wireframing that keeps teams focused on structure, not aesthetics. 30-day free trial.", freeLabel: "Free trial", url: "https://balsamiq.com", color: "text-orange-600", bg: "bg-orange-500/10 border-orange-500/20", emoji: "✏️", category: "lo-fi" },
];

export const WIREFRAMES_CATEGORIES: WorkflowCategory[] = [
  { key: "ai", label: "AI Generators", icon: Brain },
  { key: "design", label: "Design Tools", icon: PenTool },
  { key: "lo-fi", label: "Lo-Fi Tools", icon: Layers },
];

export const TESTING_TOOLS: WorkflowTool[] = [
  { id: "maze-testing", name: "Maze", tagline: "Rapid usability testing", description: "Test prototypes with real users, run tree tests, card sorts, and surveys. Get results in hours, not weeks.", freeLabel: "Free — 1 study/mo", url: "https://maze.co", color: "text-orange-600", bg: "bg-orange-500/10 border-orange-500/20", emoji: "🧩", category: "testing" },
  { id: "lookback-testing", name: "Lookback", tagline: "Moderated user sessions", description: "Run live moderated and unmoderated sessions capturing screen, voice, and face simultaneously.", freeLabel: "Free trial", url: "https://lookback.com", color: "text-blue-600", bg: "bg-blue-500/10 border-blue-500/20", emoji: "🎙️", category: "testing" },
  { id: "useberry", name: "Useberry", tagline: "Prototype & survey testing", description: "Connect Figma prototypes for unmoderated testing. Free plan includes 10 responses per study.", freeLabel: "Free tier", url: "https://www.useberry.com", color: "text-purple-600", bg: "bg-purple-500/10 border-purple-500/20", emoji: "🍒", category: "testing" },
  { id: "usabilityhub", name: "Lyssna", tagline: "Design & concept testing", description: "Five-second tests, preference tests, and surveys to validate designs fast. Free plan available.", freeLabel: "Free plan", url: "https://www.lyssna.com", color: "text-teal-600", bg: "bg-teal-500/10 border-teal-500/20", emoji: "👁️", category: "testing" },
  { id: "hotjar-testing", name: "Hotjar", tagline: "Heatmaps & recordings", description: "See exactly where users click, scroll, and drop off in your live product with heatmaps and session recordings.", freeLabel: "Free plan", url: "https://www.hotjar.com", color: "text-red-600", bg: "bg-red-500/10 border-red-500/20", emoji: "🔥", category: "analytics" },
  { id: "optimal-testing", name: "Optimal Workshop", tagline: "IA & navigation testing", description: "Tree testing and card sorting to validate information architecture. Free plan with limited responses.", freeLabel: "Free plan", url: "https://www.optimalworkshop.com", color: "text-green-600", bg: "bg-green-500/10 border-green-500/20", emoji: "🗂️", category: "analytics" },
];

export const TESTING_CATEGORIES: WorkflowCategory[] = [
  { key: "testing", label: "User Testing", icon: FlaskConical },
  { key: "analytics", label: "Analytics", icon: BarChart3 },
];

export const WORKSHOPS_TOOLS: WorkflowTool[] = [
  { id: "figjam", name: "FigJam", tagline: "Figma's collaborative whiteboard", description: "Run design sprints, ideation sessions, and retrospectives. Real-time collaboration with sticky notes, voting, and timers.", freeLabel: "Free tier", url: "https://www.figma.com/figjam/", color: "text-violet-600", bg: "bg-violet-500/10 border-violet-500/20", emoji: "🎨", category: "whiteboard" },
  { id: "miro-workshop", name: "Miro", tagline: "Virtual workshop platform", description: "Infinite whiteboard with 300+ templates for sprints, retros, and ideation. Free tier with 3 editable boards.", freeLabel: "Free tier", url: "https://miro.com", color: "text-yellow-600", bg: "bg-yellow-500/10 border-yellow-500/20", emoji: "🖼️", category: "whiteboard" },
  { id: "excalidraw", name: "Excalidraw", tagline: "Open-source sketching tool", description: "Hand-drawn style collaborative whiteboard. Completely free and open-source with no account needed.", freeLabel: "Free & open source", url: "https://excalidraw.com", color: "text-teal-600", bg: "bg-teal-500/10 border-teal-500/20", emoji: "✏️", category: "whiteboard" },
  { id: "butter", name: "Butter", tagline: "Workshop facilitation platform", description: "Purpose-built for interactive workshops — agendas, breakout rooms, polls, and activity templates all in one.", freeLabel: "Free plan", url: "https://www.butter.us", color: "text-orange-600", bg: "bg-orange-500/10 border-orange-500/20", emoji: "🧈", category: "facilitation" },
  { id: "mural", name: "MURAL", tagline: "Digital collaboration space", description: "Enterprise-grade digital workspace for design thinking. Free 30-day trial, broad template library.", freeLabel: "Free trial", url: "https://www.mural.co", color: "text-pink-600", bg: "bg-pink-500/10 border-pink-500/20", emoji: "🖌️", category: "facilitation" },
  { id: "conceptboard", name: "Conceptboard", tagline: "Visual collaboration board", description: "Infinite online whiteboard for distributed teams. Free plan with 1 active board.", freeLabel: "Free tier", url: "https://conceptboard.com", color: "text-blue-600", bg: "bg-blue-500/10 border-blue-500/20", emoji: "💡", category: "facilitation" },
];

export const WORKSHOPS_CATEGORIES: WorkflowCategory[] = [
  { key: "whiteboard", label: "Whiteboards", icon: Layers },
  { key: "facilitation", label: "Facilitation", icon: MessageSquare },
];

export const IA_TOOLS: WorkflowTool[] = [
  { id: "octopus", name: "Octopus.do", tagline: "Visual sitemap builder", description: "Build interactive sitemaps with a drag-and-drop interface. Free plan includes unlimited sitemaps and sharing.", freeLabel: "Free plan", url: "https://octopus.do", color: "text-orange-600", bg: "bg-orange-500/10 border-orange-500/20", emoji: "🐙", category: "sitemaps" },
  { id: "gloomaps", name: "Gloomaps", tagline: "Simple sitemap planner", description: "Lightweight, free sitemap tool. No signup needed — just open and start building your IA structure.", freeLabel: "Free", url: "https://www.gloomaps.com", color: "text-green-600", bg: "bg-green-500/10 border-green-500/20", emoji: "🗺️", category: "sitemaps" },
  { id: "writemaps", name: "WriteMaps", tagline: "Collaborative sitemaps", description: "Create and share visual sitemaps with colour-coded content status. Free plan included.", freeLabel: "Free plan", url: "https://writemaps.com", color: "text-blue-600", bg: "bg-blue-500/10 border-blue-500/20", emoji: "📝", category: "sitemaps" },
  { id: "optimal-sort", name: "OptimalSort", tagline: "Card sorting (Optimal Workshop)", description: "Run open, closed, and hybrid card sorts to understand how users naturally categorise your content.", freeLabel: "Free plan", url: "https://www.optimalworkshop.com/optimalsort", color: "text-teal-600", bg: "bg-teal-500/10 border-teal-500/20", emoji: "🃏", category: "validation" },
  { id: "treejack", name: "Treejack", tagline: "Tree testing (Optimal Workshop)", description: "Test your navigation structure without visual design. Find where users get lost in your IA.", freeLabel: "Free plan", url: "https://www.optimalworkshop.com/treejack", color: "text-violet-600", bg: "bg-violet-500/10 border-violet-500/20", emoji: "🌲", category: "validation" },
  { id: "slickplan", name: "Slickplan", tagline: "Sitemap & content planner", description: "Plan sitemaps, content, and user flows in one tool. Integrates with Figma and exports to multiple formats.", freeLabel: "Free trial", url: "https://slickplan.com", color: "text-pink-600", bg: "bg-pink-500/10 border-pink-500/20", emoji: "📐", category: "sitemaps" },
];

export const IA_CATEGORIES: WorkflowCategory[] = [
  { key: "sitemaps", label: "Sitemaps", icon: GitBranch },
  { key: "validation", label: "IA Validation", icon: FlaskConical },
];

export const AI_ANALYSIS_TOOLS: WorkflowTool[] = [
  { id: "dovetail-analysis", name: "Dovetail", tagline: "AI-powered research synthesis", description: "Automatically tag, cluster, and surface patterns across notes, transcripts, and recordings. Free plan available.", freeLabel: "Free plan", url: "https://dovetail.com", color: "text-pink-600", bg: "bg-pink-500/10 border-pink-500/20", emoji: "📂", category: "synthesis" },
  { id: "notably", name: "Notably", tagline: "AI research analysis", description: "Upload research notes or recordings — AI surfaces themes, sentiments, and key insights automatically.", freeLabel: "Free trial", url: "https://www.notably.ai", color: "text-violet-600", bg: "bg-violet-500/10 border-violet-500/20", emoji: "🔬", category: "synthesis" },
  { id: "condens", name: "Condens", tagline: "Research repository & analysis", description: "Organise user research, tag insights, and generate reports. Collaborative and AI-assisted.", freeLabel: "Free trial", url: "https://condens.io", color: "text-blue-600", bg: "bg-blue-500/10 border-blue-500/20", emoji: "🗄️", category: "synthesis" },
  { id: "aurelius", name: "Aurelius", tagline: "Research insights platform", description: "Capture, tag, and search across all your research. AI helps you find relevant past insights instantly.", freeLabel: "Free trial", url: "https://www.aureliuslab.com", color: "text-amber-600", bg: "bg-amber-500/10 border-amber-500/20", emoji: "💡", category: "synthesis" },
  { id: "perplexity-analysis", name: "Perplexity AI", tagline: "AI research & pattern finding", description: "Ask Perplexity to find patterns, summarise research papers, or validate your analysis with cited sources.", freeLabel: "Free plan", url: "https://www.perplexity.ai", color: "text-teal-600", bg: "bg-teal-500/10 border-teal-500/20", emoji: "🔍", category: "ai" },
  { id: "maze-analysis", name: "Maze AI", tagline: "Automated test analysis", description: "Maze's AI automatically analyses usability test results, highlights friction points, and generates insight summaries.", freeLabel: "Free tier", url: "https://maze.co", color: "text-orange-600", bg: "bg-orange-500/10 border-orange-500/20", emoji: "🧩", category: "ai" },
];

export const AI_ANALYSIS_CATEGORIES: WorkflowCategory[] = [
  { key: "synthesis", label: "Synthesis & Repo", icon: Sparkles },
  { key: "ai", label: "AI Assistants", icon: Brain },
];
