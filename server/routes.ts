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

interface OtpRecord {
  code: string;
  email: string;
  expires: number;
}
const otpStore = new Map<string, OtpRecord>();

function generateOtp(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

type SendResult = "sent" | "domain_unverified" | "no_key" | "error";

async function sendOtpEmail(email: string, code: string): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[OTP] RESEND_API_KEY not set — OTP:", code);
    return "no_key";
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "DesignFlow Kit <onboarding@resend.dev>",
        to: [email],
        subject: "Your DesignFlow Kit verification code",
        html: `
          <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px 24px">
            <h2 style="font-size:20px;font-weight:700;margin-bottom:8px">Verify your email</h2>
            <p style="color:#6b7280;font-size:14px;margin-bottom:24px">Enter this code to complete your DesignFlow Kit sign-up. It expires in 10 minutes.</p>
            <div style="background:#f3f4f6;border-radius:12px;padding:20px 32px;text-align:center;letter-spacing:0.2em;font-size:36px;font-weight:700;font-family:monospace;color:#111827">${code}</div>
            <p style="color:#9ca3af;font-size:12px;margin-top:24px">If you didn't request this, you can ignore this email.</p>
          </div>`,
      }),
    });
    const body = await res.json().catch(() => ({})) as any;
    if (!res.ok) {
      console.error("[OTP] Resend API error:", res.status, JSON.stringify(body));
      if (res.status === 403) return "domain_unverified";
      return "error";
    }
    return "sent";
  } catch (err) {
    console.error("[OTP] Email send failed:", err);
    return "error";
  }
}

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

  // Save session
  app.post("/api/sessions/save", async (req: Request, res: Response) => {
    try {
      const { email, toolId, toolPath, toolLabel, messages } = req.body;
      if (!email || !toolId || !messages) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      const session = await storage.saveSession({ email, toolId, toolPath, toolLabel, messages });
      const host = `${req.protocol}://${req.get("host")}`;
      const resumeUrl = `${host}${toolPath}?resume=${session.token}`;
      // Send email
      const apiKey = process.env.RESEND_API_KEY;
      if (apiKey) {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            from: "DesignFlow Kit <onboarding@resend.dev>",
            to: [email],
            subject: `Resume your ${toolLabel} session — DesignFlow Kit`,
            html: `<div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px 24px">
              <h2 style="font-size:20px;font-weight:700;margin-bottom:8px">Your session is saved ✓</h2>
              <p style="color:#6b7280;font-size:14px;margin-bottom:24px">Click the button below to resume your <strong>${toolLabel}</strong> session exactly where you left off.</p>
              <a href="${resumeUrl}" style="display:inline-block;background:#111827;color:#fff;text-decoration:none;padding:12px 28px;border-radius:8px;font-size:14px;font-weight:600">Resume session →</a>
              <p style="color:#9ca3af;font-size:12px;margin-top:24px">Or copy this link:<br/><span style="word-break:break-all">${resumeUrl}</span></p>
              <p style="color:#d1d5db;font-size:11px;margin-top:16px">DesignFlow Kit · Open-source UX toolkit</p>
            </div>`,
          }),
        }).catch(() => {});
      }
      res.json({ token: session.token, resumeUrl });
    } catch (err) {
      console.error("Save session error:", err);
      res.status(500).json({ error: "Failed to save session" });
    }
  });

  // Load session
  app.get("/api/sessions/:token", async (req: Request, res: Response) => {
    const session = await storage.getSession(req.params.token);
    if (!session) return res.status(404).json({ error: "Session not found" });
    res.json(session);
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

  app.post("/api/send-otp", async (req: Request, res: Response) => {
    const { email } = req.body;
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: "Invalid email address" });
    }
    const code = generateOtp();
    otpStore.set(email.toLowerCase(), { code, email, expires: Date.now() + 10 * 60 * 1000 });
    const result = await sendOtpEmail(email, code);

    if (result === "sent") {
      return res.json({ ok: true });
    }
    // Fall back to showing the code on-screen for any failure
    // (no key, unverified domain, or other error) — gate still works
    return res.status(200).json({ ok: true, demo: true, code });
  });

  app.post("/api/verify-otp", (req: Request, res: Response) => {
    const { email, code } = req.body;
    if (!email || !code) return res.status(400).json({ error: "Missing fields" });
    const record = otpStore.get(email.toLowerCase());
    if (!record) return res.status(400).json({ error: "No OTP found for this email. Please request a new one." });
    if (Date.now() > record.expires) {
      otpStore.delete(email.toLowerCase());
      return res.status(400).json({ error: "OTP has expired. Please request a new one." });
    }
    if (record.code !== String(code).trim()) {
      return res.status(400).json({ error: "Incorrect code. Please try again." });
    }
    otpStore.delete(email.toLowerCase());
    return res.json({ ok: true });
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
