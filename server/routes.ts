import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import OpenAI, { toFile } from "openai";
import multer from "multer";

const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  const systemPrompts: Record<string, string> = {
    "ux-research": `You are an expert UX Research assistant. Help designers with:
- User research planning and methodology
- Interview guide creation
- Survey design and analysis
- Competitive analysis frameworks
- Usability testing protocols
- Research synthesis and insights`,
    "personas": `You are an expert at creating user personas. Help designers with:
- Building detailed user personas from research data
- Defining demographics, behaviors, goals, and pain points
- Creating empathy maps
- Developing proto-personas for early validation
- Writing persona narratives and use cases`,
    "journey-maps": `You are an expert at journey mapping and flow design. Help designers with:
- Customer journey mapping with touchpoints and emotions
- User flow diagrams for features and processes
- Mind mapping for ideation and organization
- Service blueprints showing frontstage and backstage
- Identifying pain points and opportunities in journeys`,
    "ux-testing": `You are an expert at UX testing and evaluation. Help designers with:
- Usability test planning and script creation
- A/B test design and hypothesis formation
- Heuristic evaluation using Nielsen's principles
- Accessibility audits (WCAG compliance)
- Remote testing methodologies
- Analyzing and presenting test results`,
    "workshops": `You are an expert at facilitating design workshops. Help designers with:
- Design sprint planning (Google Ventures style)
- Ideation workshop exercises (crazy 8s, dot voting)
- Stakeholder alignment sessions
- Co-creation activities with users
- Workshop facilitation best practices
- Creating agendas and activity templates`,
    "wireframes": `You are an expert at wireframing and prototyping. Help designers with:
- Low-fidelity wireframe structures and layouts
- Paper prototype descriptions
- Component placement and hierarchy
- Responsive layout considerations
- Quick validation sketches
- ASCII/text-based wireframe representations`,
    "information-architecture": `You are an expert at Information Architecture. Help designers with:
- Site map creation and hierarchy design
- Card sorting exercise planning
- Navigation structure design
- Content strategy and organization
- Taxonomy and labeling systems
- Tree testing methodologies`,
    "ai-analysis": `You are an expert at AI-powered UX analysis. Help designers with:
- Sentiment analysis of user feedback
- Pattern recognition in usage data
- Predictive UX insights
- Automated research synthesis
- Trend identification
- Data-driven recommendations`
  };

  // UX Research Chat endpoint (legacy)
  app.post("/api/ux-research/chat", async (req: Request, res: Response) => {
    req.body.type = "ux-research";
    return handleUXChat(req, res, systemPrompts, openai);
  });

  // Unified UX Automation Chat endpoint
  app.post("/api/ux-automation/chat", async (req: Request, res: Response) => {
    return handleUXChat(req, res, systemPrompts, openai);
  });

  // Audio transcription endpoint
  app.post("/api/transcribe", upload.single("audio"), async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No audio file provided" });
      }

      const file = await toFile(req.file.buffer, "audio.webm", { type: req.file.mimetype });

      const transcription = await openai.audio.transcriptions.create({
        file,
        model: "whisper-1",
      });

      res.json({ text: transcription.text });
    } catch (error: any) {
      console.error("Transcription error:", error);
      res.status(500).json({ error: "Failed to transcribe audio" });
    }
  });

  return httpServer;
}

async function handleUXChat(
  req: any,
  res: any,
  systemPrompts: Record<string, string>,
  openai: OpenAI
) {
  try {
    const { type, messages, documentContent } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required" });
    }

    const basePrompt = systemPrompts[type] || systemPrompts["ux-research"];
    const chartInstructions = `

CHART GENERATION:
When the user asks for charts, graphs, or visualizations, generate them using this exact format:

\`\`\`chart
{
  "type": "bar|line|pie|area",
  "title": "Chart Title",
  "data": [
    {"name": "Category1", "value": 100},
    {"name": "Category2", "value": 200}
  ],
  "xKey": "name",
  "yKey": "value"
}
\`\`\`

For multi-series data:
\`\`\`chart
{
  "type": "bar",
  "title": "Comparison Chart",
  "data": [
    {"name": "Q1", "desktop": 100, "mobile": 80},
    {"name": "Q2", "desktop": 120, "mobile": 90}
  ],
  "xKey": "name",
  "dataKeys": ["desktop", "mobile"]
}
\`\`\`

Chart types: "bar" for comparisons, "line" for trends over time, "area" for volume trends, "pie" for proportions.
Always provide realistic sample data when creating example charts. Include explanatory text before or after the chart.`;

    const systemPrompt = `${basePrompt}
${chartInstructions}

${documentContent ? `The user has uploaded a document with the following content:\n\n${documentContent}\n\nUse this document context to inform your responses.` : ''}

Be helpful, specific, and provide actionable guidance. When appropriate, offer templates, frameworks, or step-by-step processes.`;

    const chatMessages = [
      { role: "system" as const, content: systemPrompt },
      ...messages.map((m: { role: string; content: string }) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
    ];

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const stream = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: chatMessages,
      stream: true,
      max_tokens: 2048,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || "";
      if (content) {
        res.write(`data: ${JSON.stringify({ content })}\n\n`);
      }
    }

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch (error) {
    console.error("Error in UX chat:", error);
    if (res.headersSent) {
      res.write(`data: ${JSON.stringify({ error: "Failed to process request" })}\n\n`);
      res.end();
    } else {
      res.status(500).json({ error: "Failed to process request" });
    }
  }
}
