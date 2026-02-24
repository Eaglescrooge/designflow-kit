# DesignFlow Kit

An open-source UX/Product Design toolkit that streamlines your entire design workflow from pre-design research to post-launch testing.

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/Eaglescrooge/designflow-kit)](https://github.com/Eaglescrooge/designflow-kit)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)](CONTRIBUTING.md)

## Overview

DesignFlow Kit provides designers with a comprehensive, integrated system covering:

- **Pre-Design Phase**: Research tools, persona creation, journey mapping, wireframing, and prototyping
- **Post-Design Phase**: Design reviews, developer handover, sprint management, usability testing, and documentation
- **41+ Integrations**: Connect with popular design tools like Figma, Miro, Notion, and more
- **30 AI Automation Tools**: Leverage AI-powered workflows and custom GPTs for faster design
- **8 AI-Powered UX Chat Tools**: Interactive ChatGPT-like interfaces for each design phase
- **Design Sprint Board**: Kanban-style drag-and-drop board with voice recording and AI suggestions

## Features

### Mega-Menu Navigation
Full-width dropdown navigation panels inspired by modern enterprise sites, featuring categorized tool access with a colored sidebar, multi-column layouts for Kits and UX Automation sections.

### Interactive Dashboard
Track your design deliverables across both pre-design and post-design phases. Progress is automatically saved to your browser's local storage, so you can pick up where you left off.

### Design Sprint Board
A fully interactive kanban-style board with:
- Drag-and-drop cards across customizable lanes
- Voice recording with OpenAI Whisper transcription
- AI-powered card suggestions via GPT-4o
- Sprint templates (GV Design Sprint, Design Thinking, Double Diamond, and more)
- Priority levels, labels, and due dates
- Full localStorage persistence

### AI-Powered UX Automation (8 Chat Tools)
Interactive chat interfaces powered by OpenAI GPT-4o with streaming responses:
- **UX Research** - Conduct interviews, surveys, and competitive analysis
- **Create Personas** - Build data-driven user personas
- **Journey Maps** - Visualize user journeys and flow charts
- **UX Testing** - Run usability tests and gather feedback
- **Design Workshops** - Facilitate collaborative design thinking
- **Wireframes** - Create low-fidelity wireframes and sketches
- **Information Architecture** - Organize content and navigation
- **AI-Powered Analysis** - Pattern recognition and auto-insights

Each tool supports chart and graph generation via code blocks in AI responses.

### Pre-Design Kit (10 Tools)
| Tool | Description |
|------|-------------|
| Research Tools | Structured templates for user research and competitive analysis |
| Synthesize Data | Transform research into actionable insights |
| Create Personas | Data-driven persona creation toolkit |
| Journey Maps | Visualize user experiences and touchpoints |
| Lo-Fi Wireframes | Rapid wireframing for concept validation |
| UX Testing | Validate early designs with real users |
| Workshop Tools | Card sorting and design thinking exercises |
| Design System | Build scalable component libraries |
| Hi-Fi Wireframes | Production-ready design toolkit |
| UX Prototype | Interactive prototyping with animations |

### Post-Design Kit (7 Tools)
| Tool | Description |
|------|-------------|
| Design Review | Structured feedback collection framework |
| Design Shipping | Automated asset management and versioning |
| Dev Handover | Seamless design-to-development workflow |
| Sprint Board | Agile design sprint management |
| Usability Testing | Post-launch testing with A/B testing and analytics |
| Process Docs | Documentation automation |
| Metrics Dashboard | Track design impact with KPIs |

### Integrations
Connect DesignFlow Kit with 41+ popular tools including:
- **Design**: Figma, Sketch, Adobe XD, Framer
- **Research**: Typeform, UserTesting, Hotjar, Maze
- **Collaboration**: Miro, Notion, Slack, Jira
- **Development**: GitHub, Zeplin, Storybook

### UX Automation Tools
30 AI-powered design tools organized by category:
- **Custom GPTs**: Design-focused ChatGPT integrations
- **Wireframing**: AI-assisted layout generation
- **UI Generation**: Automated UI design tools
- **Prototyping & Code**: Design-to-code solutions
- **Research & Testing**: AI research assistants
- **Design Systems**: Automated documentation tools
- **Copywriting**: AI writing assistants

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui (Radix primitives)
- **Font**: Plus Jakarta Sans (geometric sans-serif)
- **Routing**: Wouter
- **State Management**: TanStack React Query
- **Data Persistence**: Browser localStorage
- **Build Tool**: Vite
- **Backend**: Node.js, Express, TypeScript
- **AI Integration**: OpenAI GPT-4o (streaming SSE), Whisper (audio transcription)

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Eaglescrooge/designflow-kit.git

# Navigate to the project
cd designflow-kit

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:5000`.

### Environment Variables
- `SESSION_SECRET` - Session secret for Express (auto-generated if not set)
- OpenAI API key is managed via Replit AI Integrations for the chat tools and voice transcription

## Documentation

| Document | Description |
|----------|-------------|
| [User Guide](docs/user-guide.md) | How to use the dashboard and track progress |
| [Developer Guide](docs/developer-guide.md) | Architecture, data models, and extending the toolkit |
| [Integrations](docs/integrations.md) | Complete list of supported integrations |
| [UX Automation](docs/ux-automation.md) | AI tools and custom GPTs |
| [Contributing](CONTRIBUTING.md) | Guidelines for contributing |

## Project Structure

```
designflow-kit/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # UI components (shadcn/ui)
│   │   ├── pages/          # Route components
│   │   │   ├── home.tsx              # Landing page with mega-menu nav
│   │   │   ├── dashboard.tsx         # Design deliverables tracker
│   │   │   ├── sprint-board.tsx      # Kanban sprint board
│   │   │   ├── automate-ux.tsx       # AI tool selection page
│   │   │   ├── ux-research.tsx       # AI chat - UX Research
│   │   │   ├── ux-personas.tsx       # AI chat - Personas
│   │   │   ├── ux-journey-maps.tsx   # AI chat - Journey Maps
│   │   │   ├── ux-testing.tsx        # AI chat - UX Testing
│   │   │   ├── ux-workshops.tsx      # AI chat - Workshops
│   │   │   ├── ux-wireframes.tsx     # AI chat - Wireframes
│   │   │   ├── ux-information-architecture.tsx  # AI chat - IA
│   │   │   ├── ux-ai-analysis.tsx    # AI chat - AI Analysis
│   │   │   ├── tool-detail.tsx       # Individual tool pages
│   │   │   ├── integration-detail.tsx # Integration API docs
│   │   │   └── docs.tsx              # Documentation page
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utilities and data
│   │       ├── data.ts               # Tool and integration data
│   │       └── sprint-board-data.ts  # Sprint board templates
├── server/                 # Express backend
│   ├── index.ts            # Server entry point
│   ├── routes.ts           # API routes (transcription, AI chat)
│   └── storage.ts          # Data access layer
├── shared/                 # Shared code
│   └── schema.ts           # Database schema and types
└── docs/                   # Documentation
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Ways to Contribute
- Report bugs and request features
- Improve documentation
- Add new tool integrations
- Enhance UI/UX
- Add new AI-powered design workflows

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Community

- [GitHub Discussions](https://github.com/Eaglescrooge/designflow-kit/discussions)
- [LinkedIn](https://www.linkedin.com/company/designflowkit/)
- [Discord Community](https://discord.gg/designflow)
- [Twitter/X](https://twitter.com/designflowkit)

## Acknowledgments

Built with love by designers, for designers. Special thanks to all our contributors who help make DesignFlow Kit better every day.

---

**[Get Started](https://designflow-kit.replit.app)** | **[View Demo](https://designflow-kit.replit.app)** | **[Star on GitHub](https://github.com/Eaglescrooge/designflow-kit)**
#Minor formatting improvement
