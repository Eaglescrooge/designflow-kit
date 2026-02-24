export interface UxMethodOption {
  label: string;
  description: string;
  prompt: string;
}

export interface UxWorkflowMethods {
  title: string;
  subtitle: string;
  methods: UxMethodOption[];
}

export const uxMethodsByWorkflow: Record<string, UxWorkflowMethods> = {
  "ux-research": {
    title: "What type of research?",
    subtitle: "Choose a research method to focus your AI assistant",
    methods: [
      { label: "Competitive Research", description: "Analyze competitors' UX strengths and weaknesses", prompt: "I want to conduct competitive research." },
      { label: "Comparative Research", description: "Compare multiple solutions side by side", prompt: "I want to do comparative research." },
      { label: "User Interviews", description: "Plan and conduct qualitative user interviews", prompt: "I want to plan user interviews." },
      { label: "Survey Design", description: "Create structured surveys for quantitative data", prompt: "I want to design a survey." },
      { label: "Contextual Inquiry", description: "Observe users in their natural environment", prompt: "I want to plan a contextual inquiry." },
      { label: "Diary Study", description: "Track user behavior over time with diary entries", prompt: "I want to set up a diary study." },
      { label: "Card Sorting", description: "Understand how users categorize information", prompt: "I want to run a card sorting exercise." },
      { label: "Heuristic Evaluation", description: "Expert review against usability principles", prompt: "I want to conduct a heuristic evaluation." },
    ],
  },
  "personas": {
    title: "What type of persona?",
    subtitle: "Select a persona framework to build with AI",
    methods: [
      { label: "Demographic Persona", description: "Age, gender, location, income-based profiles", prompt: "I want to create a demographic-based persona." },
      { label: "Behavioral Persona", description: "Based on user actions and usage patterns", prompt: "I want to create a behavioral persona." },
      { label: "Goal-Directed Persona", description: "Focused on what users want to achieve", prompt: "I want to create a goal-directed persona." },
      { label: "Empathy Map", description: "What users think, feel, say, and do", prompt: "I want to create an empathy map." },
      { label: "Proto-Persona", description: "Quick assumption-based persona for early stages", prompt: "I want to create a proto-persona." },
      { label: "Negative Persona", description: "Define who is NOT your target user", prompt: "I want to create a negative/exclusionary persona." },
    ],
  },
  "journey-maps": {
    title: "What type of visualization?",
    subtitle: "Pick a mapping technique for your AI assistant",
    methods: [
      { label: "Customer Journey Map", description: "End-to-end user experience across touchpoints", prompt: "I want to create a customer journey map." },
      { label: "User Flow Diagram", description: "Step-by-step task completion paths", prompt: "I want to create a user flow diagram." },
      { label: "Service Blueprint", description: "Frontstage and backstage service interactions", prompt: "I want to create a service blueprint." },
      { label: "Experience Map", description: "Broader view of user experience beyond your product", prompt: "I want to create an experience map." },
      { label: "Mind Map", description: "Brainstorm and connect ideas visually", prompt: "I want to create a mind map." },
      { label: "Storyboard", description: "Illustrate scenarios with narrative frames", prompt: "I want to create a storyboard." },
    ],
  },
  "ux-testing": {
    title: "What type of testing?",
    subtitle: "Choose a testing methodology",
    methods: [
      { label: "Usability Testing", description: "Task-based testing with real users", prompt: "I want to plan usability testing." },
      { label: "A/B Testing", description: "Compare two design variants statistically", prompt: "I want to set up A/B testing." },
      { label: "Accessibility Audit", description: "WCAG compliance and inclusive design checks", prompt: "I want to conduct an accessibility audit." },
      { label: "Guerrilla Testing", description: "Quick, informal testing in public spaces", prompt: "I want to plan guerrilla testing." },
      { label: "Tree Testing", description: "Validate information architecture findability", prompt: "I want to run tree testing." },
      { label: "First Click Testing", description: "Measure where users click first on a page", prompt: "I want to set up first click testing." },
      { label: "5-Second Test", description: "Test first impressions and visual hierarchy", prompt: "I want to run a 5-second test." },
    ],
  },
  "workshops": {
    title: "What type of workshop?",
    subtitle: "Select a facilitation framework",
    methods: [
      { label: "Design Sprint", description: "Google Ventures 5-day sprint methodology", prompt: "I want to plan a design sprint." },
      { label: "Ideation Session", description: "Generate creative solutions with brainstorming", prompt: "I want to facilitate an ideation session." },
      { label: "Design Critique", description: "Structured feedback on design work", prompt: "I want to run a design critique." },
      { label: "Stakeholder Workshop", description: "Align business goals with user needs", prompt: "I want to plan a stakeholder workshop." },
      { label: "Co-creation Session", description: "Collaborate directly with users on solutions", prompt: "I want to facilitate a co-creation session." },
      { label: "Retrospective", description: "Reflect on what worked and what to improve", prompt: "I want to run a design retrospective." },
    ],
  },
  "wireframes": {
    title: "What type of wireframe?",
    subtitle: "Choose a wireframing approach",
    methods: [
      { label: "Sketch Wireframe", description: "Quick hand-drawn style low-fidelity layouts", prompt: "I want to create sketch wireframes." },
      { label: "Digital Wireframe", description: "Clean, structured low-fidelity digital layouts", prompt: "I want to create digital wireframes." },
      { label: "Responsive Wireframe", description: "Multi-device layout planning", prompt: "I want to create responsive wireframes." },
      { label: "Content Wireframe", description: "Focus on content hierarchy and placement", prompt: "I want to create content-first wireframes." },
      { label: "Interactive Prototype", description: "Clickable wireframes for user testing", prompt: "I want to plan an interactive prototype." },
      { label: "Component Wireframe", description: "Individual UI component specifications", prompt: "I want to wireframe specific components." },
    ],
  },
  "information-architecture": {
    title: "What IA approach?",
    subtitle: "Choose an information architecture method",
    methods: [
      { label: "Site Map", description: "Hierarchical structure of pages and sections", prompt: "I want to create a site map." },
      { label: "Navigation Design", description: "Plan menus, breadcrumbs, and wayfinding", prompt: "I want to design the navigation structure." },
      { label: "Content Audit", description: "Inventory and evaluate existing content", prompt: "I want to conduct a content audit." },
      { label: "Taxonomy Design", description: "Create categories, labels, and metadata", prompt: "I want to design a taxonomy." },
      { label: "Content Strategy", description: "Plan content creation and governance", prompt: "I want to develop a content strategy." },
      { label: "IA Validation", description: "Test findability and navigation effectiveness", prompt: "I want to validate the information architecture." },
    ],
  },
  "ai-analysis": {
    title: "What type of analysis?",
    subtitle: "Choose an AI-powered analysis method",
    methods: [
      { label: "Sentiment Analysis", description: "Analyze user feedback tone and emotions", prompt: "I want to perform sentiment analysis on user feedback." },
      { label: "Pattern Recognition", description: "Identify recurring UX patterns in data", prompt: "I want to identify UX patterns in my data." },
      { label: "Predictive UX", description: "Forecast user behavior and preferences", prompt: "I want to run predictive UX analysis." },
      { label: "Heatmap Analysis", description: "Interpret click and scroll heatmap data", prompt: "I want to analyze heatmap data." },
      { label: "Session Analysis", description: "Review user session recordings for insights", prompt: "I want to analyze user session data." },
      { label: "NPS & CSAT Analysis", description: "Deep dive into satisfaction score trends", prompt: "I want to analyze NPS and CSAT scores." },
    ],
  },
};
