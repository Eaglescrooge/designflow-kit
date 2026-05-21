<div align="center">
  <h1>⚡ DesignFlow Kit</h1>
  <p><strong>An open-source, AI-powered UX/Product Design Toolkit — from research to handover.</strong></p>

  <p>
    <a href="https://github.com/Eaglescrooge/designflow-kit/stargazers"><img src="https://img.shields.io/github/stars/Eaglescrooge/designflow-kit?style=flat-square&color=6366f1" alt="Stars" /></a>
    <a href="https://github.com/Eaglescrooge/designflow-kit/network/members"><img src="https://img.shields.io/github/forks/Eaglescrooge/designflow-kit?style=flat-square&color=3b82f6" alt="Forks" /></a>
    <a href="https://github.com/Eaglescrooge/designflow-kit/issues"><img src="https://img.shields.io/github/issues/Eaglescrooge/designflow-kit?style=flat-square" alt="Issues" /></a>
    <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="MIT License" /></a>
    <a href="https://github.com/Eaglescrooge/designflow-kit/blob/main/CONTRIBUTING.md"><img src="https://img.shields.io/badge/contributions-welcome-brightgreen?style=flat-square" alt="Contributions Welcome" /></a>
  </p>

  <br />

  <p>
    <a href="https://designflow-kit.replit.app"><strong>🚀 Live Demo</strong></a> &nbsp;·&nbsp;
    <a href="https://github.com/Eaglescrooge/designflow-kit/issues/new?template=bug_report.md">Report Bug</a> &nbsp;·&nbsp;
    <a href="https://github.com/Eaglescrooge/designflow-kit/issues/new?template=feature_request.md">Request Feature</a> &nbsp;·&nbsp;
    <a href="https://discord.gg/designflow">Discord Community</a>
  </p>
</div>

---

## What is DesignFlow Kit?

DesignFlow Kit is a fully integrated design operations platform covering the **complete product design lifecycle** — from early user research through to developer handover. It brings AI automation, collaboration tools, curated third-party tool recommendations, and design management into a single open-source toolkit.

> Built with React 18, TypeScript, Express, OpenAI GPT-4o, and TailwindCSS.

---

## ✨ Features

### 🤖 8 AI-Powered UX Chat Tools (Automate UX)

Interactive, GPT-4o streaming chat interfaces — each one specialised for a distinct design phase:

| Tool | What it does | Contextual Tools Panel |
|------|-------------|------------------------|
| **UX Research** | Interview guides, surveys, competitor analysis | Perplexity AI, Maze, Hotjar, Dovetail, Lookback, Optimal Workshop |
| **Create Personas** | Data-driven personas with empathy maps | QoQo.ai, Make My Persona, UserPersona.dev, Crystal, Xtensio |
| **Journey Maps** | User journeys, flow diagrams, service blueprints | UXPressia, Miro, Smaply, Custellence, Lucidchart |
| **Wireframes** | Lo-fi wireframe specs and component breakdowns | Uizard, Galileo AI, Penpot, Wireframe.cc, Balsamiq |
| **UX Testing** | Usability tests, A/B plans, heuristic reviews | Maze, Lookback, Useberry, Lyssna, Hotjar |
| **Design Workshops** | Facilitation guides, card sorting, design sprints | FigJam, Miro, Excalidraw, Butter, MURAL |
| **Information Architecture** | Site maps, navigation hierarchies, content models | Octopus.do, OptimalSort, Treejack, Gloomaps, Slickplan |
| **AI Analysis** | Pattern recognition, auto-insights, sentiment analysis | Dovetail, Notably, Condens, Aurelius, Perplexity AI |

**Each tool includes:**
- 🔍 **Contextual Tools Panel** — a curated slide-out panel listing the best free/freemium AI tools for that specific workflow, with direct links
- 💾 **Save & Resume Session** — after your first AI response, you're prompted to save the conversation via email. A private resume link lets you pick up exactly where you left off on any device — no account required
- 📝 **Saved Prompts sidebar** — star any prompt to save it for reuse across sessions
- 📊 **Inline chart generation** — AI responses can render charts and graphs directly in the chat

**Gate system:** After 3 free prompts, email + OTP verification (via Resend) unlocks unlimited access. Completing sign-up assigns you a designer role and personalises your experience.

---

### 📊 Interactive Dashboard

Track design deliverables across both pre-design and post-design phases. Progress persists in **localStorage** — no account required, no data leaves your browser.

---

### 🗂 Design Sprint Board

A fully featured Kanban board with:

- **Drag-and-drop** cards across customisable lanes
- **Voice recording** with OpenAI Whisper transcription — speak your thoughts, AI turns them into cards
- **AI card suggestions** via GPT-4o
- Sprint templates: GV Design Sprint, Design Thinking, Double Diamond, and more
- Priority levels, labels, and due dates
- Full **localStorage persistence**

---

### 🧩 Pre-Design Kit — 10 Tools

| Tool | Description |
|------|-------------|
| Research Tools | Structured templates for user research |
| Synthesize Data | Transform research into actionable insights |
| Create Personas | Data-driven persona toolkit |
| Journey Maps | Visualise experiences and touchpoints |
| Lo-Fi Wireframes | Rapid wireframing for concept validation |
| UX Testing | Validate early designs with real users |
| Workshop Tools | Card sorting and design thinking exercises |
| Design System | Build scalable component libraries |
| Hi-Fi Wireframes | Production-ready design toolkit |
| UX Prototype | Interactive prototyping with animations |

---

### 🚀 Post-Design Kit — 7 Tools

| Tool | Description |
|------|-------------|
| Design Review | Structured feedback collection framework |
| Design Shipping | Automated asset management and versioning |
| Dev Handover | Seamless design-to-development workflow |
| Sprint Board | Agile design sprint management |
| Usability Testing | Post-launch testing with A/B analytics |
| Process Docs | Documentation automation |
| Metrics Dashboard | Track design impact with KPIs |

---

### 🔌 41+ Integrations

Connect DesignFlow Kit with the tools your team already uses:

**Design** — Figma, Sketch, Adobe XD, Framer, InVision  
**Collaboration** — Notion, Miro, FigJam, Confluence, Whimsical  
**Project Management** — Jira, Linear, Asana, Trello, ClickUp  
**Communication** — Slack, Microsoft Teams, Loom, Zoom  
**Development** — GitHub, GitLab, Storybook, Zeplin, Abstract  
**Analytics** — Hotjar, Maze, FullStory, Amplitude, Mixpanel  
**Productivity** — Airtable, Coda, Google Workspace, Dropbox, Zapier

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, TypeScript, Vite |
| Routing | Wouter |
| Styling | Tailwind CSS, shadcn/ui (Radix UI) |
| State | TanStack React Query |
| Backend | Node.js, Express |
| AI | OpenAI GPT-4o (streaming), Whisper (voice transcription) |
| Email | Resend (OTP verification + session save links) |
| Persistence | Browser localStorage + in-memory server sessions |
| Fonts | Inter, Space Grotesk |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- An OpenAI API key ([platform.openai.com](https://platform.openai.com))
- A Resend API key — free at [resend.com](https://resend.com) (used for OTP and session save emails)

### Local Setup

```bash
# Clone the repository
git clone https://github.com/Eaglescrooge/designflow-kit.git
cd designflow-kit

# Install dependencies
npm install

# Set your environment variables
cp .env.example .env
# Edit .env and add:
#   OPENAI_API_KEY=your_key_here
#   RESEND_API_KEY=your_key_here
#   SESSION_SECRET=any_random_string

# Start the dev server
npm run dev
```

The app will be available at `http://localhost:5000`.

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | ✅ | Powers all AI chat tools and voice transcription |
| `RESEND_API_KEY` | ✅ | Sends OTP emails for gate unlock + session save links |
| `SESSION_SECRET` | ✅ | Signs server-side session tokens |

> **Note:** The free Resend plan delivers to verified email addresses only. For local development, OTP codes are also shown on-screen as a fallback.

---

## 📁 Project Structure

```
designflow-kit/
├── client/                         # React frontend
│   └── src/
│       ├── components/             # UI components
│       │   ├── automate-gate-modal.tsx     # OTP gate modal
│       │   ├── saved-prompts-pane.tsx      # Prompts sidebar
│       │   ├── save-session-modal.tsx      # Save & resume session UI
│       │   ├── research-tools-panel.tsx    # UX Research tools panel
│       │   ├── workflow-tools-panel.tsx    # Generic workflow tools panel
│       │   ├── chart-renderer.tsx          # Inline chart rendering
│       │   ├── chat-message.tsx            # Chat bubble component
│       │   └── ui/                         # shadcn/ui primitives
│       ├── hooks/                  # Custom React hooks
│       │   ├── use-automate-gate.ts        # Gate + lockout logic
│       │   ├── use-saved-prompts.ts        # Prompt persistence
│       │   └── use-save-session.ts         # Session save/resume logic
│       ├── lib/
│       │   ├── data.ts                     # Tool and integration data
│       │   ├── workflow-tools-data.ts      # Per-workflow tool panel data
│       │   └── sprint-board-data.ts        # Sprint board templates
│       └── pages/                  # Route components
│           ├── home.tsx                    # Landing page
│           ├── automate-ux.tsx             # Automate UX hub
│           ├── dashboard.tsx               # Progress dashboard
│           ├── sprint-board.tsx            # Kanban sprint board
│           ├── ux-research.tsx             # AI chat — UX Research
│           ├── ux-personas.tsx             # AI chat — Create Personas
│           ├── ux-journey-maps.tsx         # AI chat — Journey Maps
│           ├── ux-wireframes.tsx           # AI chat — Wireframes
│           ├── ux-testing.tsx              # AI chat — UX Testing
│           ├── ux-workshops.tsx            # AI chat — Design Workshops
│           ├── ux-information-architecture.tsx  # AI chat — IA
│           ├── ux-ai-analysis.tsx          # AI chat — AI Analysis
│           ├── integrations.tsx            # Integrations directory
│           ├── integration-detail.tsx      # Integration detail page
│           ├── tool-detail.tsx             # Tool detail page
│           └── docs.tsx                    # Documentation
├── server/
│   ├── index.ts                    # Express entry point
│   ├── routes.ts                   # API routes (AI chat, OTP, transcription, sessions)
│   └── storage.ts                  # Data access layer + session storage
├── shared/
│   └── schema.ts                   # Drizzle ORM schema + Zod types
└── README.md
```

---

## 🗺 Roadmap

- [ ] PostgreSQL persistence for sessions and prompts
- [ ] User accounts and team workspaces
- [ ] Figma plugin integration
- [ ] Export AI conversations to PDF / Notion
- [ ] Real-time collaborative sprint board (WebSocket)
- [ ] More sprint templates
- [ ] Custom AI system prompt per tool

---

## 🤝 Contributing

Contributions are welcome! Here's how to get involved:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to your branch: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Ways to Contribute

- 🐛 Report bugs and request features via [Issues](https://github.com/Eaglescrooge/designflow-kit/issues)
- 📖 Improve documentation
- 🔌 Add new tool integrations or curated tool panel entries
- 🎨 Enhance UI/UX
- 🤖 Add new AI-powered design workflows

Please read our [Contributing Guide](CONTRIBUTING.md) for full details.

---

## 📄 License

Distributed under the **MIT License**. See [LICENSE](LICENSE) for details.

---

## 💬 Community

- [GitHub Discussions](https://github.com/Eaglescrooge/designflow-kit/discussions)
- [Discord](https://discord.gg/designflow)
- [LinkedIn](https://www.linkedin.com/company/designflowkit/)
- [Twitter / X](https://twitter.com/designflowkit)

---

<div align="center">
  <p>If DesignFlow Kit is useful to you, please consider giving it a ⭐ — it helps others discover the project.</p>
  <br />
  <strong>
    <a href="https://designflow-kit.replit.app">Live Demo</a> ·
    <a href="https://github.com/Eaglescrooge/designflow-kit">GitHub</a> ·
    <a href="https://github.com/Eaglescrooge/designflow-kit/stargazers">Star the repo</a>
  </strong>
</div>
