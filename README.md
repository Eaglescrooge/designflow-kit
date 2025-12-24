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

## Features

### Interactive Dashboard
Track your design deliverables across both pre-design and post-design phases. Progress is automatically saved to your browser's local storage, so you can pick up where you left off.

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
- **Routing**: Wouter
- **State Management**: TanStack React Query
- **Data Persistence**: Browser localStorage
- **Build Tool**: Vite

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

No environment variables are required - the app uses browser localStorage for data persistence.

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
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utilities and data
├── server/                 # Express backend
│   ├── index.ts            # Server entry point
│   ├── routes.ts           # API routes
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

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Community

- [GitHub Discussions](https://github.com/Eaglescrooge/designflow-kit/discussions)
- [Discord Community](https://discord.gg/designflow)
- [Twitter/X](https://twitter.com/designflowkit)

## Acknowledgments

Built with love by designers, for designers. Special thanks to all our contributors who help make DesignFlow Kit better every day.

---

**[Get Started](https://designflow-kit.replit.app)** | **[View Demo](https://designflow-kit.replit.app)** | **[Star on GitHub](https://github.com/Eaglescrooge/designflow-kit)**
