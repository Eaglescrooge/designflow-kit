# Contributing to DesignFlow Kit

Thank you for your interest in contributing to DesignFlow Kit! This guide will help you get started.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Setup](#development-setup)
4. [Making Contributions](#making-contributions)
5. [Adding New Tools](#adding-new-tools)
6. [Adding Integrations](#adding-integrations)
7. [Coding Guidelines](#coding-guidelines)
8. [Submitting Changes](#submitting-changes)
9. [Getting Help](#getting-help)

---

## Code of Conduct

We are committed to providing a welcoming and inclusive environment. Please:

- Be respectful and considerate
- Welcome newcomers and help them get started
- Focus on constructive feedback
- Avoid personal attacks or harassment

---

## Getting Started

### Ways to Contribute

| Type | Description |
|------|-------------|
| Bug Reports | Report issues you encounter |
| Feature Requests | Suggest new features or improvements |
| Documentation | Improve docs, fix typos, add examples |
| Code | Fix bugs, add features, improve performance |
| Design | Improve UI/UX, add new components |
| Testing | Add tests, improve coverage |

### Finding Issues

1. Check [GitHub Issues](https://github.com/Eaglescrooge/designflow-kit/issues)
2. Look for labels:
   - `good first issue` - Great for newcomers
   - `help wanted` - Ready for contribution
   - `bug` - Something isn't working
   - `enhancement` - New feature or improvement

---

## Development Setup

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Git

### Clone and Install

```bash
# Fork the repository on GitHub first, then:
git clone https://github.com/YOUR-USERNAME/designflow-kit.git
cd designflow-kit

# Install dependencies
npm install

# Start development server
npm run dev
```

### Verify Setup

1. Open `http://localhost:5000`
2. Navigate through the app
3. Check that all pages load correctly

---

## Making Contributions

### Workflow

1. **Fork** the repository
2. **Clone** your fork locally
3. **Create a branch** for your changes
4. **Make changes** and test locally
5. **Commit** with clear messages
6. **Push** to your fork
7. **Open a Pull Request**

### Branch Naming

Use descriptive branch names:

```
feature/add-new-tool-name
fix/dashboard-progress-bug
docs/update-readme
```

### Commit Messages

Write clear, descriptive commit messages:

```
# Good
Add Hotjar integration with API documentation
Fix progress bar not updating on dashboard
Update developer guide with new examples

# Bad
fix stuff
update
changes
```

---

## Adding New Tools

### Pre-Design or Post-Design Tool

1. Open `client/src/lib/data.ts`

2. Add to the appropriate array (`preKitTools` or `postKitTools`):

```typescript
{
  id: "my-tool",              // URL-friendly ID
  title: "My Tool",           // Display name
  description: "Short description (1-2 sentences)",
  icon: MyIcon,               // Import from lucide-react
  integrations: ["Figma", "Notion"],  // Related tools
  phase: "pre",               // or "post"
  detailedDescription: "Longer description explaining the tool's purpose and benefits...",
  howToUse: [
    "Step 1: First step",
    "Step 2: Second step",
    "Step 3: Third step",
    "Step 4: Fourth step",
    "Step 5: Fifth step"
  ],
  youtubeId: "VIDEO_ID",      // YouTube video ID (from URL)
  signupUrl: "https://example.com",
  signupLabel: "Get Started"
}
```

3. Import the icon at the top of the file:

```typescript
import { MyIcon } from "lucide-react";
```

4. Test your changes:
   - View the tool on the dashboard
   - Navigate to `/tools/my-tool`
   - Verify video and links work

---

## Adding Integrations

### Add a New Integration

1. Open `client/src/lib/data.ts`

2. Add to the `integrations` array:

```typescript
{
  id: "my-integration",
  name: "My Integration",
  description: "What this integration does",
  icon: "🔧",                 // Emoji icon
  category: "design",         // design, research, collaboration, etc.
  features: [
    "Feature one",
    "Feature two",
    "Feature three"
  ],
  website: "https://example.com",
  docsUrl: "https://docs.example.com",
  youtubeId: "VIDEO_ID",
  howToUse: [
    "Step 1: How to use this",
    "Step 2: Next step",
    "Step 3: Final step"
  ],
  apiDocumentation: {
    baseUrl: "https://api.example.com/v1",
    authMethod: "Bearer Token",   // or "API Key", "OAuth 2.0"
    endpoints: [
      {
        method: "GET",
        path: "/resources",
        description: "List all resources"
      },
      {
        method: "POST",
        path: "/resources",
        description: "Create a new resource"
      }
    ]
  }
}
```

3. Test your changes:
   - View the integration card
   - Navigate to `/integrations/my-integration`
   - Verify all sections display correctly

---

## Adding UX Automation Tools

1. Open `client/src/lib/data.ts`

2. Add to `uxAutomationTools`:

```typescript
{
  id: "my-ai-tool",
  name: "My AI Tool",
  description: "Short description of what it does",
  url: "https://example.com",
  category: "wireframing",    // See categories below
  hasGPT: false               // true if it's a ChatGPT-based tool
}
```

### Categories

| Category | Description |
|----------|-------------|
| `gpt` | ChatGPT-based custom GPTs |
| `wireframing` | AI wireframe generation |
| `ui-generation` | AI UI design generation |
| `prototyping` | Design-to-code tools |
| `research` | AI research assistants |
| `testing` | AI testing tools |
| `design-system` | Design system automation |
| `copywriting` | AI writing tools |

---

## Coding Guidelines

### TypeScript

- Use TypeScript for all new code
- Define interfaces for data structures
- Avoid `any` types when possible

```typescript
// Good
interface Tool {
  id: string;
  title: string;
}

// Avoid
const tool: any = { ... };
```

### React Components

- Use functional components with hooks
- Keep components focused and reusable
- Add `data-testid` attributes for testing

```typescript
function MyComponent({ title }: { title: string }) {
  return (
    <div data-testid="my-component">
      <h1>{title}</h1>
    </div>
  );
}
```

### Styling

- Use Tailwind CSS utility classes
- Follow existing patterns in the codebase
- Support dark mode with appropriate classes

```tsx
// Good
<div className="bg-background text-foreground dark:bg-gray-900">

// Avoid inline styles
<div style={{ backgroundColor: 'white' }}>
```

### File Organization

- Pages go in `client/src/pages/`
- Shared components in `client/src/components/`
- Data and utilities in `client/src/lib/`
- Tool/integration data in `client/src/lib/data.ts`

---

## Submitting Changes

### Pull Request Process

1. **Update documentation** if needed
2. **Test your changes** locally
3. **Create a Pull Request** with:
   - Clear title describing the change
   - Description of what and why
   - Screenshots for UI changes
   - Link to related issue(s)

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring

## Screenshots (if applicable)
Add screenshots here

## Checklist
- [ ] I've tested my changes locally
- [ ] I've updated documentation if needed
- [ ] My code follows the project style
```

### Review Process

1. Maintainers will review your PR
2. Address any feedback or requested changes
3. Once approved, your PR will be merged

---

## Getting Help

### Resources

- [Documentation](docs/)
- [GitHub Discussions](https://github.com/Eaglescrooge/designflow-kit/discussions)
- [Discord Community](https://discord.gg/designflow)

### Questions?

- Open a [Discussion](https://github.com/Eaglescrooge/designflow-kit/discussions) for general questions
- Open an [Issue](https://github.com/Eaglescrooge/designflow-kit/issues) for bugs or feature requests
- Join our Discord for real-time help

---

## Recognition

Contributors are recognized in:
- README.md contributors section
- Release notes for significant contributions
- Our community Discord

Thank you for contributing to DesignFlow Kit!

---

**[Back to README](README.md)** | **[Developer Guide](docs/developer-guide.md)**
