import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import { 
  preKitTools, 
  postKitTools, 
  integrations, 
  stats, 
  quickStartCode,
  footerLinks 
} from "@/lib/data";
import { 
  Github, 
  Star, 
  ArrowRight, 
  Box, 
  Zap,
  Menu,
  X,
  ChevronRight,
  ExternalLink,
  Mail
} from "lucide-react";
import { SiGithub, SiX, SiDiscord, SiLinkedin } from "react-icons/si";
import { useState } from "react";

function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navLinks = [
    { label: "Pre-Kit", href: "#pre-kit" },
    { label: "Post-Kit", href: "#post-kit" },
    { label: "Integrations", href: "#integrations" },
    { label: "Docs", href: "#getting-started" }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-16">
          <a href="#" className="flex items-center gap-2" data-testid="link-logo">
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
              <Box className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-serif font-bold text-lg tracking-tight">DesignFlow</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                data-testid={`link-nav-${link.label.toLowerCase().replace(' ', '-')}`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="outline" size="sm" className="hidden sm:flex gap-2" data-testid="button-github-nav">
              <SiGithub className="w-4 h-4" />
              <Star className="w-3 h-3" />
              <span>8.5k</span>
            </Button>
            <Button size="sm" className="hidden sm:flex" data-testid="button-get-started-nav">
              Get Started
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid={`link-mobile-nav-${link.label.toLowerCase().replace(' ', '-')}`}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex gap-2 pt-2 px-3">
                <Button variant="outline" size="sm" className="flex-1 gap-2" data-testid="button-github-mobile">
                  <SiGithub className="w-4 h-4" />
                  GitHub
                </Button>
                <Button size="sm" className="flex-1" data-testid="button-get-started-mobile">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="min-h-screen pt-24 pb-20 lg:pt-32 lg:pb-32 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Open Source UX Toolkit</span>
            </div>
            
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]" data-testid="text-hero-title">
              Streamline Your
              <span className="text-primary block mt-2">Design Workflow</span>
            </h1>
            
            <p className="text-lg lg:text-xl text-muted-foreground max-w-xl leading-relaxed" data-testid="text-hero-description">
              A comprehensive, open-source toolkit for UX and Product designers. 
              Pre-design research to post-launch testing, all in one integrated system.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="gap-2" data-testid="button-get-started-hero">
                Get Started Free
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="lg" className="gap-2" data-testid="button-github-hero">
                <SiGithub className="w-5 h-5" />
                View on GitHub
              </Button>
            </div>

            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div 
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-primary/60 border-2 border-background flex items-center justify-center text-xs font-medium text-primary-foreground"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">150+</span> contributors worldwide
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 rounded-2xl blur-3xl" />
              <Card className="relative border-2 overflow-hidden">
                <div className="bg-muted/50 px-4 py-3 border-b border-border flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-destructive/60" />
                    <div className="w-3 h-3 rounded-full bg-chart-4/60" />
                    <div className="w-3 h-3 rounded-full bg-chart-2/60" />
                  </div>
                  <span className="text-xs text-muted-foreground ml-2">DesignFlow Kit</span>
                </div>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Box className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Pre-Kit Tools</p>
                        <p className="text-xs text-muted-foreground">10 research & design tools</p>
                      </div>
                      <Badge variant="secondary" className="ml-auto">Active</Badge>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-chart-2/10 flex items-center justify-center">
                        <Zap className="w-5 h-5 text-chart-2" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Post-Kit Tools</p>
                        <p className="text-xs text-muted-foreground">6 testing & handover tools</p>
                      </div>
                      <Badge variant="secondary" className="ml-auto">Active</Badge>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-chart-3/10 flex items-center justify-center">
                        <ExternalLink className="w-5 h-5 text-chart-3" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">40+ Integrations</p>
                        <p className="text-xs text-muted-foreground">Figma, Miro, Notion & more</p>
                      </div>
                      <Badge variant="outline" className="ml-auto">Connected</Badge>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Workflow Status</span>
                      <span className="font-medium text-chart-2">All systems active</span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full w-full bg-gradient-to-r from-chart-2 to-primary rounded-full" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProblemSolutionSection() {
  return (
    <section className="py-20 lg:py-32 px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="space-y-6">
            <Badge variant="outline" className="text-destructive border-destructive/30">The Problem</Badge>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold tracking-tight" data-testid="text-problem-title">
              Design workflows are fragmented across dozens of tools
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Designers juggle between research platforms, prototyping tools, testing software, 
              and handover solutions. Each tool has its own learning curve, pricing model, and 
              data format. Context switching kills productivity and creativity.
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <X className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
                <span>No unified workflow between research and implementation</span>
              </li>
              <li className="flex items-start gap-3">
                <X className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
                <span>Manual data transfer between different platforms</span>
              </li>
              <li className="flex items-start gap-3">
                <X className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
                <span>Inconsistent documentation and process standards</span>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <Badge variant="outline" className="text-chart-2 border-chart-2/30">The Solution</Badge>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold tracking-tight" data-testid="text-solution-title">
              One toolkit for your entire design lifecycle
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              DesignFlow Kit provides a comprehensive, integrated solution that covers 
              every stage of the design process. From initial research to final handover, 
              everything works together seamlessly.
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <ChevronRight className="w-5 h-5 text-chart-2 mt-0.5 shrink-0" />
                <span>End-to-end coverage from research to deployment</span>
              </li>
              <li className="flex items-start gap-3">
                <ChevronRight className="w-5 h-5 text-chart-2 mt-0.5 shrink-0" />
                <span>API-first design integrates with your existing tools</span>
              </li>
              <li className="flex items-start gap-3">
                <ChevronRight className="w-5 h-5 text-chart-2 mt-0.5 shrink-0" />
                <span>Open source, free, and community-driven</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function ToolCard({ tool, index }: { tool: typeof preKitTools[0]; index: number }) {
  const Icon = tool.icon;
  return (
    <Card 
      className="group transition-all duration-200 hover:shadow-md hover:border-primary/30"
      data-testid={`card-tool-${tool.id}`}
    >
      <CardContent className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <Badge variant="secondary" className="text-xs">
            {String(index + 1).padStart(2, '0')}
          </Badge>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">{tool.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{tool.description}</p>
        </div>

        <div className="flex flex-wrap gap-1.5 pt-2">
          {tool.integrations.map((integration) => (
            <Badge key={integration} variant="outline" className="text-xs font-normal">
              {integration}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function PreKitSection() {
  return (
    <section id="pre-kit" className="py-20 lg:py-32 px-6 lg:px-8 scroll-mt-20">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="max-w-3xl space-y-4">
          <Badge variant="default">Pre-Kit</Badge>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold tracking-tight" data-testid="text-prekit-title">
            Research to Prototype
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to go from initial research to interactive prototypes. 
            Ten integrated tools covering the complete pre-design workflow.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {preKitTools.map((tool, index) => (
            <ToolCard key={tool.id} tool={tool} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PostKitSection() {
  return (
    <section id="post-kit" className="py-20 lg:py-32 px-6 lg:px-8 bg-muted/30 scroll-mt-20">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="max-w-3xl space-y-4">
          <Badge variant="default">Post-Kit</Badge>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold tracking-tight" data-testid="text-postkit-title">
            Testing to Handover
          </h2>
          <p className="text-lg text-muted-foreground">
            Seamlessly transition from design to development. Six tools for testing, 
            shipping, and maintaining design quality in production.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {postKitTools.map((tool, index) => (
            <ToolCard key={tool.id} tool={tool} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function IntegrationsSection() {
  return (
    <section id="integrations" className="py-20 lg:py-32 px-6 lg:px-8 scroll-mt-20">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="outline">Ecosystem</Badge>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold tracking-tight" data-testid="text-integrations-title">
            Integrates with your favorite tools
          </h2>
          <p className="text-lg text-muted-foreground">
            Connect with 40+ design tools and platforms. DesignFlow Kit works 
            seamlessly alongside your existing workflow.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {integrations.map((integration) => (
            <Card 
              key={integration.name} 
              className="group hover:border-primary/30 transition-colors"
              data-testid={`card-integration-${integration.name.toLowerCase()}`}
            >
              <CardContent className="p-4 text-center space-y-2">
                <div className="w-12 h-12 mx-auto rounded-xl bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <span className="text-lg font-bold text-muted-foreground group-hover:text-primary transition-colors">
                    {integration.name.charAt(0)}
                  </span>
                </div>
                <p className="font-medium text-sm">{integration.name}</p>
                <p className="text-xs text-muted-foreground">{integration.category}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" className="gap-2" data-testid="button-view-integrations">
            View all integrations
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="py-20 lg:py-32 px-6 lg:px-8 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center space-y-2" data-testid={`stat-${stat.label.toLowerCase()}`}>
              <p className="font-serif text-4xl lg:text-5xl font-bold">{stat.value}</p>
              <p className="font-medium text-lg">{stat.label}</p>
              <p className="text-sm text-primary-foreground/70">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GettingStartedSection() {
  return (
    <section id="getting-started" className="py-20 lg:py-32 px-6 lg:px-8 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-6">
            <Badge variant="outline">Quick Start</Badge>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold tracking-tight" data-testid="text-getting-started-title">
              Get started in minutes
            </h2>
            <p className="text-lg text-muted-foreground">
              Install DesignFlow Kit with a single command and start streamlining 
              your design workflow immediately. Full documentation and examples included.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="gap-2" data-testid="button-read-docs">
                Read the docs
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="lg" data-testid="button-view-examples">
                View examples
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent rounded-xl blur-2xl" />
            <Card className="relative overflow-hidden">
              <div className="bg-muted/80 px-4 py-3 border-b border-border flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-chart-4/60" />
                  <div className="w-3 h-3 rounded-full bg-chart-2/60" />
                </div>
                <span className="text-xs text-muted-foreground font-mono ml-2">terminal</span>
              </div>
              <CardContent className="p-0">
                <pre className="p-6 text-sm font-mono overflow-x-auto">
                  <code className="text-foreground">{quickStartCode}</code>
                </pre>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

function OpenSourceCTASection() {
  return (
    <section className="py-20 lg:py-32 px-6 lg:px-8 bg-muted/30">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <Badge variant="default" className="bg-chart-2 hover:bg-chart-2">
          <Github className="w-3 h-3 mr-1" />
          Open Source
        </Badge>
        
        <h2 className="font-serif text-3xl lg:text-4xl font-bold tracking-tight" data-testid="text-opensource-title">
          Built by designers, for designers
        </h2>
        
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          DesignFlow Kit is open source and free forever. Join our growing community 
          of contributors and help shape the future of design tooling.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" className="gap-2" data-testid="button-star-github">
            <Star className="w-5 h-5" />
            Star on GitHub
          </Button>
          <Button variant="outline" size="lg" className="gap-2" data-testid="button-contribute">
            <SiDiscord className="w-5 h-5" />
            Join Discord
          </Button>
        </div>

        <div className="flex items-center justify-center gap-8 pt-8">
          <div className="text-center">
            <p className="font-serif text-2xl font-bold">MIT</p>
            <p className="text-sm text-muted-foreground">License</p>
          </div>
          <div className="w-px h-12 bg-border" />
          <div className="text-center">
            <p className="font-serif text-2xl font-bold">150+</p>
            <p className="text-sm text-muted-foreground">Contributors</p>
          </div>
          <div className="w-px h-12 bg-border" />
          <div className="text-center">
            <p className="font-serif text-2xl font-bold">Weekly</p>
            <p className="text-sm text-muted-foreground">Updates</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-16 lg:py-20 px-6 lg:px-8 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          <div className="col-span-2 md:col-span-1 space-y-4">
            <a href="#" className="flex items-center gap-2" data-testid="link-footer-logo">
              <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
                <Box className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-serif font-bold text-lg">DesignFlow</span>
            </a>
            <p className="text-sm text-muted-foreground">
              Open source UX/Product design toolkit. Built by designers, for designers.
            </p>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="hover-elevate" data-testid="button-social-github">
                <SiGithub className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover-elevate" data-testid="button-social-twitter">
                <SiX className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover-elevate" data-testid="button-social-discord">
                <SiDiscord className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover-elevate" data-testid="button-social-linkedin">
                <SiLinkedin className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-sm">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href} 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    data-testid={`link-footer-product-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-sm">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href} 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    data-testid={`link-footer-resources-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-sm">Community</h4>
            <ul className="space-y-3">
              {footerLinks.community.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href} 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    data-testid={`link-footer-community-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1 space-y-4">
            <h4 className="font-semibold text-sm">Newsletter</h4>
            <p className="text-sm text-muted-foreground">
              Get updates on new features and releases.
            </p>
            <div className="flex gap-2">
              <Input 
                type="email" 
                placeholder="you@example.com" 
                className="flex-1"
                data-testid="input-newsletter-email"
              />
              <Button size="icon" data-testid="button-newsletter-submit">
                <Mail className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            2024 DesignFlow Kit. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {footerLinks.legal.map((link) => (
              <a 
                key={link.label}
                href={link.href} 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                data-testid={`link-footer-legal-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <ProblemSolutionSection />
        <PreKitSection />
        <PostKitSection />
        <IntegrationsSection />
        <StatsSection />
        <GettingStartedSection />
        <OpenSourceCTASection />
      </main>
      <Footer />
    </div>
  );
}
