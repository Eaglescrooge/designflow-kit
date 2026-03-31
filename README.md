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

  DesignFlow Kit is a fully integrated design operations platform that covers the **complete product design lifecycle** — from early user research through to developer handover. It brings AI automation, collaboration tools, and design management into a single, open-source toolkit.

  > Built with React, TypeScript, Express, OpenAI GPT-4o, and TailwindCSS.

  ---

  ## ✨ Features

  ### 🤖 8 AI-Powered UX Chat Tools (Automate UX)

  Interactive, streaming chat interfaces powered by **OpenAI GPT-4o** — each one specialised for a distinct design phase:

  | Tool | What it does |
  |------|-------------|
  | **UX Research** | Interview guides, survey design, competitive analysis |
  | **Create Personas** | Data-driven personas with empathy maps |
  | **Journey Maps** | User journeys, flow diagrams, service blueprints |
  | **UX Testing** | Usability tests, A/B test plans, heuristic reviews |
  | **Design Workshops** | Facilitation guides, card sorting, design sprints |
  | **Wireframes** | Lo-fi wireframe specs and component breakdowns |
  | **Information Architecture** | Site maps, navigation hierarchies, content models |
  | **AI-Powered Analysis** | Pattern recognition, auto-insights, sentiment analysis |

  Each tool supports **inline chart and graph generation** from AI responses and an auto-saving **Saved Prompts sidebar** so you never lose a great prompt.

  **Gate system**: After 3 free prompts, email + OTP verification (via Resend) unlocks unlimited access. Completing sign-up assigns you a designer role and personalises your experience.

  ---

  ### 📊 Interactive Dashboard

  Track design deliverables across both pre-design and post-design phases. Progress persists in **localStorage** so you pick up exactly where you left off — no account required.

  ---

  ### 🗂 Design Sprint Board

  A fully featured Kanban board with:

  - **Drag-and-drop** cards across customisable lanes
  - **Voice recording** with OpenAI Whisper transcription
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
  | AI | OpenAI GPT-4o (streaming), Whisper (voice) |
  | Email | Resend (OTP verification) |
  | Persistence | Browser localStorage |
  | Fonts | Inter, Space Grotesk |

  ---

  ## 🚀 Getting Started

  ### Prerequisites

  - Node.js 18+
  - An OpenAI API key
  - A Resend API key (for OTP email — free at [resend.com](https://resend.com))

  ### Local Setup

  ```bash
  # Clone the repository
  git clone https://github.com/Eaglescrooge/designflow-kit.git
  cd designflow-kit

  # Install dependencies
  npm install

  # Set your environment variables
  cp .env.example .env
  # Add your OPENAI_API_KEY and RESEND_API_KEY

  # Start the dev server
  npm run dev
  ```

  The app will be available at `http://localhost:5000`.

  ---

  ## 📁 Project Structure

  ```
  designflow-kit/
  ├── client/                     # React frontend
  │   └── src/
  │       ├── components/         # UI components (shadcn/ui + custom)
  │       │   ├── automate-gate-modal.tsx   # OTP gate modal
  │       │   ├── saved-prompts-pane.tsx    # Prompts sidebar
  │       │   └── ui/             # shadcn/ui primitives
  │       ├── hooks/              # Custom React hooks
  │       │   ├── use-automate-gate.ts      # Gate + lockout logic
  │       │   └── use-saved-prompts.ts      # Prompt persistence
  │       ├── pages/              # Route components
  │       │   ├── home.tsx        # Landing page
  │       │   ├── dashboard.tsx   # Progress dashboard
  │       │   ├── sprint-board.tsx # Kanban sprint board
  │       │   ├── ux-research.tsx # AI chat — Research
  │       │   ├── ux-personas.tsx # AI chat — Personas
  │       │   ├── ux-journey-maps.tsx
  │       │   ├── ux-testing.tsx
  │       │   ├── ux-workshops.tsx
  │       │   ├── ux-wireframes.tsx
  │       │   ├── ux-information-architecture.tsx
  │       │   ├── ux-ai-analysis.tsx
  │       │   ├── integrations.tsx
  │       │   └── integration-detail.tsx
  │       └── lib/
  │           ├── data.ts         # Tool and integration data
  │           └── sprint-board-data.ts
  ├── server/
  │   ├── index.ts                # Express entry point
  │   ├── routes.ts               # API routes (AI chat, OTP, transcription)
  │   └── storage.ts              # Data access layer
  ├── shared/
  │   └── schema.ts               # Drizzle ORM schema + Zod types
  └── README.md
  ```

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
  - 🔌 Add new tool integrations
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
    <strong><a href="https://designflow-kit.replit.app">Live Demo</a> · <a href="https://github.com/Eaglescrooge/designflow-kit">GitHub</a> · <a href="https://github.com/Eaglescrooge/designflow-kit/stargazers">Star the repo</a></strong>
  </div>
  