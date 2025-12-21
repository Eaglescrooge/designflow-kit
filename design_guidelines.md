# DesignFlow Kit - Design Guidelines

## Design Approach

**Hybrid Reference-Based System**: Drawing inspiration from Linear's precision, Notion's content organization, and Figma's designer-friendly aesthetics. This toolkit serves designers, so the interface itself must exemplify excellent design while maintaining high functionality.

## Typography System

**Font Stack**:
- Primary: Inter (Google Fonts) - body text, UI elements
- Accent: Space Grotesk (Google Fonts) - headings, emphasis

**Hierarchy**:
- Hero Headline: 4xl-6xl (responsive), font-bold, Space Grotesk
- Section Headings: 3xl-4xl, font-bold, Space Grotesk, tracking-tight
- Subsections: xl-2xl, font-semibold, Inter
- Body Text: base-lg, font-normal, Inter, leading-relaxed
- UI Elements: sm-base, font-medium, Inter
- Captions/Labels: xs-sm, font-normal, Inter, text-opacity-70

## Layout System

**Spacing Primitives**: Consistently use Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24, 32

**Container Strategy**:
- Max-width: 7xl for main content areas
- Sections: py-20 lg:py-32, px-6 lg:px-8
- Component spacing: gap-8 lg:gap-12 for grids
- Vertical rhythm: space-y-6 for content blocks

**Grid Patterns**:
- Feature showcases: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Tool cards: grid-cols-1 lg:grid-cols-2
- Documentation: Single column max-w-4xl for readability

## Component Library

**Navigation**:
- Fixed header with backdrop-blur-lg
- Logo + horizontal navigation (md+)
- Mobile: Hamburger menu with slide-out drawer
- CTA button in navigation (GitHub star count integration)

**Hero Section** (Marketing Landing):
- Asymmetric two-column layout (60/40 split)
- Left: Headline, description, dual CTA buttons (primary + secondary with GitHub icon)
- Right: Feature showcase card displaying live toolkit preview
- Height: min-h-screen with proper content padding
- Buttons on any overlays: backdrop-blur-md bg-white/10 border border-white/20

**Cards**:
- Elevated style: border rounded-xl p-6 lg:p-8
- Hover: subtle scale transform (scale-[1.02]) with transition-transform
- Shadow: shadow-sm hover:shadow-md
- Internal spacing: space-y-4

**Tool Showcase Sections**:
- Pre-Kit & Post-Kit as separate major sections
- Each tool gets dedicated card with icon (Heroicons), title, description, integration badges
- Use staggered grid for visual interest

**Integration Badges**:
- Small pills: rounded-full px-3 py-1 text-xs font-medium
- Display logos/names of integrated APIs (Figma, Miro, Notion, etc.)
- Horizontal scroll on mobile: flex overflow-x-auto gap-2

**Feature Comparison Table**:
- Responsive: card-based on mobile, table on desktop
- Alternating row treatment for readability
- Sticky header on scroll

**Documentation Preview**:
- Code-style blocks: rounded-lg p-4 font-mono text-sm
- Sidebar navigation on desktop (sticky)
- Breadcrumb navigation

**Footer**:
- Multi-column layout: grid-cols-1 md:grid-cols-4
- Sections: Product, Resources, Community, Legal
- Newsletter signup with inline form
- Social icons (GitHub, Twitter, Discord, LinkedIn)
- "Built by designers, for designers" tagline

## Images

**Hero Section Image**: 
- Product screenshot or toolkit interface preview in a floating card/window design
- Shows actual Pre-Kit or Post-Kit interface
- Modern browser chrome or subtle device frame
- Placement: Right side of hero section, overlapping slightly with content

**Feature Section Images**:
- Screenshot examples of each major tool (persona templates, journey maps, wireframes)
- Placed within respective feature cards
- Maintain consistent aspect ratio (16:9 or 4:3)

**Integration Section**:
- Logo grid of integrated tools (Figma, Miro, Notion, etc.)
- Clean, icon-based visualization
- No large imagery needed here

**Community/Social Proof**:
- Avatar circles of contributors
- GitHub activity visualization
- No stock photos - authentic project imagery only

**Overall Image Strategy**: This is a designer tool, so showcase actual product interfaces and real usage examples. Avoid generic imagery. Hero image is essential to demonstrate the toolkit's polish.

## Forms

**Newsletter Signup**:
- Inline style: flex items with input + button
- Input: rounded-lg px-4 py-3 border
- Submit button: rounded-lg px-6 py-3 font-medium

**Search** (Documentation):
- Prominent placement with keyboard shortcut hint (⌘K)
- Rounded-full design, icon prefix

## Accessibility

- Focus states: ring-2 ring-offset-2 on all interactive elements
- Minimum touch targets: 44x44px (h-11 p-3)
- Form labels always visible
- Skip navigation link
- Semantic HTML5 structure throughout

## Animations

**Minimal & Purposeful**:
- Scroll-triggered fade-in for feature cards: transition-opacity duration-700
- Navigation hover: subtle underline animation
- Card hover: transform scale-[1.02] transition-all duration-200
- Page transitions: Simple fade, no complex scroll effects
- NO parallax, NO scroll-jacking

## Page Structure

1. **Hero** - Asymmetric layout with product preview
2. **Problem/Solution** - Two-column explaining the need
3. **Pre-Kit Tools** - 3-column grid of tool cards (9 tools)
4. **Post-Kit Tools** - 3-column grid of tool cards (6 tools)
5. **Integration Ecosystem** - Logo cloud with API partners
6. **Community Stats** - 4-column metrics (downloads, contributors, stars, integrations)
7. **Getting Started** - Code snippet + quick start guide
8. **Open Source CTA** - GitHub contribution call-to-action
9. **Footer** - Comprehensive navigation and newsletter

**Total sections**: 9 well-defined, content-rich sections creating a complete, professional presentation.