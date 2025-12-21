# DesignFlow Kit

## Overview

DesignFlow Kit is an open-source UX/Product Design toolkit built as a full-stack web application. It provides integrated tools for designers covering pre-design workflows (research, personas, journey maps, wireframes) and post-design workflows (testing, handover, documentation). The application follows a marketing landing page pattern with tool showcases and integration highlights.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with custom configuration for development and production
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with custom design tokens and CSS variables for theming
- **Component Library**: shadcn/ui (Radix UI primitives with custom styling)
- **Design System**: Custom theme with Inter (body) and Space Grotesk (headings) fonts, supporting light/dark modes

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript (ESM modules)
- **API Pattern**: RESTful endpoints prefixed with `/api`
- **Development**: Vite middleware integration for HMR
- **Production**: Static file serving from compiled frontend

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` (shared between client and server)
- **Validation**: Zod schemas generated from Drizzle schemas via drizzle-zod
- **Storage Interface**: Abstracted storage layer (`server/storage.ts`) with in-memory implementation, designed for database swap

### Project Structure
```
client/           # React frontend application
  src/
    components/   # UI components (shadcn/ui)
    pages/        # Route components
    hooks/        # Custom React hooks
    lib/          # Utilities and data
server/           # Express backend
  index.ts        # Server entry point
  routes.ts       # API route definitions
  storage.ts      # Data access layer
shared/           # Shared code between client/server
  schema.ts       # Database schema and types
```

### Build System
- **Development**: `tsx` for TypeScript execution with Vite dev server
- **Production Build**: Custom script using esbuild (server) and Vite (client)
- **Output**: Compiled to `dist/` with server as CJS bundle and client as static assets

## External Dependencies

### Database
- **PostgreSQL**: Primary database (configured via `DATABASE_URL` environment variable)
- **Drizzle Kit**: Database migrations and schema management

### UI Components (Radix UI)
Full shadcn/ui component library including dialogs, dropdowns, forms, navigation, and data display components

### Third-Party Services (Configured but Optional)
- Google Fonts: Inter, Space Grotesk, Fira Code, DM Sans
- Social integrations referenced: GitHub, Discord, LinkedIn, Twitter/X

### Development Tools
- Replit-specific plugins for development (cartographer, dev-banner, error overlay)
- TypeScript with strict mode and path aliases