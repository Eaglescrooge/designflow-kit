import { Link, useLocation } from "wouter";
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
  footerLinks,
  uxAutomationTools 
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
  Mail,
  Sparkles,
  Wand2,
  Layout,
  Palette,
  TestTube,
  FileText,
  Search,
  Layers,
  GitFork,
  BarChart2
} from "lucide-react";
import { SiGithub, SiLinkedin, SiInstagram, SiFigma, SiMiro, SiNotion, SiJira, SiSlack, SiStorybook, SiAdobe, SiAsana, SiTrello } from "react-icons/si";
import { useState, useRef, useEffect, type MouseEvent } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState<string | null>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const megaMenuTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  const navLinks = [
    { label: "Sprint Board", href: "/sprint-board" },
    { label: "Automate UX", href: "/automate-ux" },
    { label: "Integrations", href: "#integrations" },
    { label: "Docs", href: "/docs" }
  ];

  useEffect(() => {
    function handleClickOutside(event: globalThis.MouseEvent) {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target as Node)) {
        setMegaMenuOpen(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMegaMenuEnter = (menu: string) => {
    if (megaMenuTimerRef.current) clearTimeout(megaMenuTimerRef.current);
    setMegaMenuOpen(menu);
  };

  const handleMegaMenuLeave = () => {
    megaMenuTimerRef.current = setTimeout(() => {
      setMegaMenuOpen(null);
    }, 200);
  };

  const handlePanelEnter = () => {
    if (megaMenuTimerRef.current) clearTimeout(megaMenuTimerRef.current);
  };

  const handlePanelLeave = () => {
    megaMenuTimerRef.current = setTimeout(() => {
      setMegaMenuOpen(null);
    }, 200);
  };

  const uxCategories = [
    { key: "gpt", label: "Custom GPTs", icon: Sparkles },
    { key: "wireframing", label: "Wireframing & Sitemaps", icon: Layout },
    { key: "ui-generation", label: "UI Generation", icon: Palette },
    { key: "prototyping", label: "Prototyping & Code", icon: TestTube },
    { key: "research", label: "Research & Testing", icon: Search, also: "testing" },
    { key: "design-system", label: "Design Systems", icon: Layers },
    { key: "copywriting", label: "Copywriting", icon: FileText },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border" ref={megaMenuRef}>
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-16">
          <a href="#" className="flex items-center gap-2" data-testid="link-logo">
            <img src="/logo.png" alt="DesignFlow Logo" className="w-8 h-8 rounded-md" />
            <span className="font-serif font-bold text-lg tracking-tight">DesignFlow</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            <button
              className={`flex items-center gap-1 text-sm font-medium transition-colors ${megaMenuOpen === 'kits' ? 'text-foreground border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'}`}
              onMouseEnter={() => handleMegaMenuEnter('kits')}
              onMouseLeave={handleMegaMenuLeave}
              onClick={() => setMegaMenuOpen(megaMenuOpen === 'kits' ? null : 'kits')}
              data-testid="button-kits-menu"
            >
              Kits
              <ChevronRight className={`w-3 h-3 transition-transform ${megaMenuOpen === 'kits' ? 'rotate-90' : 'rotate-90'}`} />
            </button>
            {navLinks.map((link) => (
              link.href.startsWith('/') ? (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  data-testid={`link-nav-${link.label.toLowerCase().replace(' ', '-')}`}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  data-testid={`link-nav-${link.label.toLowerCase().replace(' ', '-')}`}
                >
                  {link.label}
                </a>
              )
            ))}
            <button
              className={`flex items-center gap-1 text-sm font-medium transition-colors ${megaMenuOpen === 'ux' ? 'text-foreground border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'}`}
              onMouseEnter={() => handleMegaMenuEnter('ux')}
              onMouseLeave={handleMegaMenuLeave}
              onClick={() => setMegaMenuOpen(megaMenuOpen === 'ux' ? null : 'ux')}
              data-testid="button-ux-automation-menu"
            >
              UX Automation
              <ChevronRight className="w-3 h-3 rotate-90" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a href="https://github.com/Eaglescrooge/designflow-kit" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="hidden sm:flex gap-2" data-testid="button-github-nav">
                <SiGithub className="w-4 h-4" />
                <Star className="w-3 h-3" />
                <span>Star</span>
              </Button>
            </a>
            <Link href="/automate-ux">
              <Button size="sm" className="hidden sm:flex" data-testid="button-get-started-nav">
                Automate UX
              </Button>
            </Link>
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
      </nav>

      {megaMenuOpen === 'kits' && (
        <div
          className="hidden md:block absolute left-0 right-0 top-16 bg-background border-b border-border shadow-lg z-50"
          onMouseEnter={handlePanelEnter}
          onMouseLeave={handlePanelLeave}
          data-testid="mega-menu-kits"
        >
          <div className="flex max-w-7xl mx-auto">
            <div className="w-72 bg-primary text-primary-foreground p-8 flex flex-col justify-between flex-shrink-0">
              <div>
                <h3 className="font-serif text-xl font-bold mb-3">Design Kits</h3>
                <p className="text-sm opacity-90 leading-relaxed">
                  Complete toolkit covering every phase of the design process, from initial research to developer handover.
                </p>
              </div>
              <Link href="/automate-ux" onClick={() => setMegaMenuOpen(null)}>
                <Button variant="outline" className="mt-6 border-primary-foreground/30 text-primary-foreground bg-transparent backdrop-blur-sm gap-2" data-testid="button-mega-get-started">
                  Automate UX <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-0 divide-x divide-border">
              <div className="p-8">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">Pre-Design Phase</h4>
                <div className="space-y-1">
                  {preKitTools.map((tool) => (
                    <a
                      key={tool.id}
                      href={`#pre-kit`}
                      onClick={() => setMegaMenuOpen(null)}
                      className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                      data-testid={`mega-link-${tool.id}`}
                    >
                      <tool.icon className="w-4 h-4 flex-shrink-0" />
                      {tool.title}
                    </a>
                  ))}
                </div>
              </div>
              <div className="p-8">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">Post-Design Phase</h4>
                <div className="space-y-1">
                  {postKitTools.map((tool) => (
                    <a
                      key={tool.id}
                      href={`#post-kit`}
                      onClick={() => setMegaMenuOpen(null)}
                      className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                      data-testid={`mega-link-${tool.id}`}
                    >
                      <tool.icon className="w-4 h-4 flex-shrink-0" />
                      {tool.title}
                    </a>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t border-border">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Quick Links</h4>
                  <div className="space-y-1">
                    <Link
                      href="/sprint-board"
                      onClick={() => setMegaMenuOpen(null)}
                      className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                      data-testid="mega-link-sprint-board"
                    >
                      <Layers className="w-4 h-4 flex-shrink-0" />
                      Sprint Board
                    </Link>
                    <Link
                      href="/dashboard"
                      onClick={() => setMegaMenuOpen(null)}
                      className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                      data-testid="mega-link-dashboard"
                    >
                      <Box className="w-4 h-4 flex-shrink-0" />
                      Dashboard
                    </Link>
                    <Link
                      href="/dashboard"
                      onClick={() => setMegaMenuOpen(null)}
                      className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                      data-testid="mega-link-track-ux"
                    >
                      <BarChart2 className="w-4 h-4 flex-shrink-0" />
                      Track UX Flow
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {megaMenuOpen === 'ux' && (
        <div
          className="hidden md:block absolute left-0 right-0 top-16 bg-background border-b border-border shadow-lg z-50"
          onMouseEnter={handlePanelEnter}
          onMouseLeave={handlePanelLeave}
          data-testid="mega-menu-ux"
        >
          <div className="flex max-w-7xl mx-auto">
            <div className="w-72 bg-primary text-primary-foreground p-8 flex flex-col justify-between flex-shrink-0">
              <div>
                <h3 className="font-serif text-xl font-bold mb-3">UX Automation</h3>
                <p className="text-sm opacity-90 leading-relaxed">
                  AI-powered design workflows and GPTs to accelerate your UX process from wireframing to testing.
                </p>
              </div>
              <Link href="/automate-ux" onClick={() => setMegaMenuOpen(null)}>
                <Button variant="outline" className="mt-6 border-primary-foreground/30 text-primary-foreground bg-transparent backdrop-blur-sm gap-2" data-testid="button-mega-automate">
                  Explore Tools <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className="flex-1 p-8">
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
                {uxCategories.map((cat) => {
                  const Icon = cat.icon;
                  const tools = uxAutomationTools.filter(t => t.category === cat.key || (cat.also && t.category === cat.also));
                  if (tools.length === 0) return null;
                  return (
                    <div key={cat.key}>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                        <Icon className="w-3.5 h-3.5" />
                        {cat.label}
                      </h4>
                      <div className="space-y-1">
                        {tools.map((tool) => (
                          <a
                            key={tool.id}
                            href={tool.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setMegaMenuOpen(null)}
                            className="flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                            data-testid={`mega-ux-${tool.id}`}
                          >
                            <span className="truncate">{tool.name}</span>
                            <ExternalLink className="w-3 h-3 flex-shrink-0 opacity-50" />
                          </a>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border max-h-[80vh] overflow-y-auto">
            <div className="flex flex-col gap-2">
              <div className="px-3 py-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Kits</span>
              </div>
              <a
                href="#pre-kit"
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors flex items-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
                data-testid="link-mobile-nav-pre-kit"
              >
                <Box className="w-4 h-4" /> Pre-Kit
              </a>
              <a
                href="#post-kit"
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors flex items-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
                data-testid="link-mobile-nav-post-kit"
              >
                <Zap className="w-4 h-4" /> Post-Kit
              </a>
              <Link
                href="/dashboard"
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors flex items-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
                data-testid="link-mobile-nav-track-ux"
              >
                <BarChart2 className="w-4 h-4" /> Track UX Flow
              </Link>
              <div className="border-t border-border my-1" />
              {navLinks.map((link) => (
                link.href.startsWith('/') ? (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid={`link-mobile-nav-${link.label.toLowerCase().replace(' ', '-')}`}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid={`link-mobile-nav-${link.label.toLowerCase().replace(' ', '-')}`}
                  >
                    {link.label}
                  </a>
                )
              ))}
              <div className="flex gap-2 pt-2 px-3">
                <a href="https://github.com/Eaglescrooge/designflow-kit" target="_blank" rel="noopener noreferrer" className="flex-1">
                  <Button variant="outline" size="sm" className="w-full gap-2" data-testid="button-github-mobile">
                    <SiGithub className="w-4 h-4" />
                    GitHub
                  </Button>
                </a>
                <Link href="/automate-ux" className="flex-1">
                  <Button size="sm" className="w-full" data-testid="button-get-started-mobile">
                    Automate UX
                  </Button>
                </Link>
              </div>
              <div className="mt-4 px-3">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="font-medium text-sm">UX Automation Tools</span>
                </div>
                <div className="space-y-2">
                  {uxAutomationTools.slice(0, 6).map((tool) => (
                    <a
                      key={tool.id}
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                      data-testid={`link-mobile-automation-${tool.id}`}
                    >
                      <Layout className="w-3 h-3" />
                      <span>{tool.name}</span>
                      {tool.gptUrl && <Badge variant="secondary" className="text-xs ml-auto">GPT</Badge>}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
    </header>
  );
}

function HeroSection() {
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimKey(k => k + 1);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen pt-24 pb-20 lg:pt-32 lg:pb-32 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI-Powered &middot; Open Source</span>
            </div>
            
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]" data-testid="text-hero-title">
              <span key={`left-${animKey}`} className="block animate-[slideInLeft_0.7s_ease-out_both]">Design Smarter,</span>
              <span key={`right-${animKey}`} className="text-primary block mt-2 animate-[slideInRight_0.7s_ease-out_0.3s_both]">Ship Faster</span>
            </h1>
            
            <p className="text-lg lg:text-xl text-muted-foreground max-w-xl leading-relaxed" data-testid="text-hero-description">
              An open-source, AI-powered UX toolkit covering pre-design research to post-launch testing. 
              8 AI chat tools, 30 automation workflows, drag-and-drop sprint boards, and 41+ integrations &mdash; all in one place.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/automate-ux">
                <Button size="lg" className="gap-2 bg-gradient-to-r from-primary to-blue-500 border-0 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30" data-testid="button-get-started-hero">
                  Automate UX
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </Button>
              </Link>
              <a href="https://github.com/Eaglescrooge/designflow-kit" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg" className="gap-2 backdrop-blur-sm" data-testid="button-github-hero">
                  <SiGithub className="w-5 h-5" />
                  View on GitHub
                </Button>
              </a>
            </div>

            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-2">
                {[
                  { bg: "bg-yellow-200", seed: "Luna" },
                  { bg: "bg-blue-200", seed: "Felix" },
                  { bg: "bg-green-200", seed: "Mia" },
                  { bg: "bg-purple-200", seed: "Kai" },
                  { bg: "bg-pink-200", seed: "Zara" },
                  { bg: "bg-orange-200", seed: "Leo" },
                ].map((avatar) => (
                  <img
                    key={avatar.seed}
                    src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${avatar.seed}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`}
                    alt={avatar.seed}
                    className="w-9 h-9 rounded-full border-2 border-background"
                    data-testid={`avatar-${avatar.seed.toLowerCase()}`}
                  />
                ))}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-3 text-sm">
                  <span className="flex items-center gap-1 font-semibold text-foreground">
                    <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" /> 203
                  </span>
                  <span className="text-muted-foreground/40">·</span>
                  <span className="flex items-center gap-1 font-semibold text-foreground">
                    <GitFork className="w-3.5 h-3.5 text-muted-foreground" /> 158
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">stars & forks on GitHub</p>
              </div>
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
                    <div key={`row1-${animKey}`} className="flex items-center gap-3 animate-[fadeSlideUp_0.5s_ease-out_0.1s_both]">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">8 AI Chat Tools</p>
                        <p className="text-xs text-muted-foreground">GPT-4o powered workflows</p>
                      </div>
                      <Badge variant="secondary" className="ml-auto">AI</Badge>
                    </div>
                    
                    <div key={`row2-${animKey}`} className="flex items-center gap-3 animate-[fadeSlideUp_0.5s_ease-out_0.3s_both]">
                      <div className="w-10 h-10 rounded-lg bg-chart-2/10 flex items-center justify-center">
                        <Box className="w-5 h-5 text-chart-2" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">17 Design Tools</p>
                        <p className="text-xs text-muted-foreground">Pre-design & post-design kits</p>
                      </div>
                      <Badge variant="secondary" className="ml-auto">Active</Badge>
                    </div>

                    <div key={`row3-${animKey}`} className="flex items-center gap-3 animate-[fadeSlideUp_0.5s_ease-out_0.5s_both]">
                      <div className="w-10 h-10 rounded-lg bg-chart-3/10 flex items-center justify-center">
                        <Zap className="w-5 h-5 text-chart-3" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Sprint Board</p>
                        <p className="text-xs text-muted-foreground">Drag-and-drop with AI suggestions</p>
                      </div>
                      <Badge variant="outline" className="ml-auto">Live</Badge>
                    </div>
                  </div>

                  <div key={`row4-${animKey}`} className="pt-4 border-t border-border animate-[fadeSlideUp_0.5s_ease-out_0.7s_both]">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Integrations</span>
                      <span className="font-medium text-chart-2">41+ tools connected</span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-muted overflow-hidden">
                      <div key={`bar-${animKey}`} className="h-full bg-gradient-to-r from-chart-2 to-primary rounded-full animate-[growWidth_1s_ease-out_0.9s_both]" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <div className="mt-20 lg:mt-24">
          <p className="text-center text-[11px] font-medium text-muted-foreground/50 uppercase tracking-[0.2em] mb-10">
            Works with the tools you love
          </p>
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
            <div className="flex animate-scroll-x w-max gap-14" data-testid="carousel-design-tools">
              {[
                { icon: SiFigma, name: "Figma", color: "#F24E1E" },
                { icon: SiMiro, name: "Miro", color: "#FFD02F" },
                { icon: SiNotion, name: "Notion", color: "#000000" },
                { icon: SiSlack, name: "Slack", color: "#4A154B" },
                { icon: SiGithub, name: "GitHub", color: "#181717" },
                { icon: SiJira, name: "Jira", color: "#0052CC" },
                { icon: SiStorybook, name: "Storybook", color: "#FF4785" },
                { icon: SiAdobe, name: "Adobe XD", color: "#FF61F6" },
                { icon: SiAsana, name: "Asana", color: "#F06A6A" },
                { icon: SiTrello, name: "Trello", color: "#0052CC" },
                { icon: SiFigma, name: "Figma", color: "#F24E1E" },
                { icon: SiMiro, name: "Miro", color: "#FFD02F" },
                { icon: SiNotion, name: "Notion", color: "#000000" },
                { icon: SiSlack, name: "Slack", color: "#4A154B" },
                { icon: SiGithub, name: "GitHub", color: "#181717" },
                { icon: SiJira, name: "Jira", color: "#0052CC" },
                { icon: SiStorybook, name: "Storybook", color: "#FF4785" },
                { icon: SiAdobe, name: "Adobe XD", color: "#FF61F6" },
                { icon: SiAsana, name: "Asana", color: "#F06A6A" },
                { icon: SiTrello, name: "Trello", color: "#0052CC" },
              ].map((tool, i) => (
                <div
                  key={`${tool.name}-${i}`}
                  className="flex flex-col items-center gap-3 shrink-0"
                  data-testid={`tool-icon-${tool.name.toLowerCase().replace(/\s+/g, '-')}-${i}`}
                >
                  <div className="w-14 h-14 rounded-full bg-muted/40 flex items-center justify-center">
                    <tool.icon className="w-6 h-6" style={{ color: tool.color }} />
                  </div>
                  <span className="text-[11px] text-muted-foreground/60 font-medium">{tool.name}</span>
                </div>
              ))}
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
              Design workflows are fragmented and manual
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Designers juggle dozens of disconnected tools, manually transfer data between 
              platforms, and spend hours on repetitive tasks that AI could handle in seconds. 
              Context switching kills both productivity and creativity.
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <X className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
                <span>Manually creating personas, journey maps, and research reports</span>
              </li>
              <li className="flex items-start gap-3">
                <X className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
                <span>No AI assistance across the design lifecycle</span>
              </li>
              <li className="flex items-start gap-3">
                <X className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
                <span>Fragmented tools with no unified sprint management</span>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <Badge variant="outline" className="text-chart-2 border-chart-2/30">The Solution</Badge>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold tracking-tight" data-testid="text-solution-title">
              One AI-powered toolkit for your entire design lifecycle
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              DesignFlow Kit gives you 8 interactive AI chat tools, a kanban sprint board 
              with voice recording and AI suggestions, 30 automation workflows, and 41+ 
              tool integrations &mdash; all open source and free.
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <ChevronRight className="w-5 h-5 text-chart-2 mt-0.5 shrink-0" />
                <span>Chat with AI to generate personas, journey maps, and wireframes</span>
              </li>
              <li className="flex items-start gap-3">
                <ChevronRight className="w-5 h-5 text-chart-2 mt-0.5 shrink-0" />
                <span>Drag-and-drop sprint board with Whisper voice notes and GPT-4o</span>
              </li>
              <li className="flex items-start gap-3">
                <ChevronRight className="w-5 h-5 text-chart-2 mt-0.5 shrink-0" />
                <span>41+ integrations with Figma, Miro, Notion, GitHub, and more</span>
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
  const [, setLocation] = useLocation();

  const handleCardClick = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest('[data-integration-badge]')) {
      return;
    }
    setLocation(`/tool/${tool.id}`);
  };

  return (
    <Card 
      className="group transition-all duration-200 cursor-pointer h-full border-border/60 hover:border-primary/20"
      data-testid={`card-tool-${tool.id}`}
      onClick={handleCardClick}
    >
      <CardContent className="p-6 flex flex-col gap-5 h-full">
        <div className="w-10 h-10 rounded-lg bg-primary/8 flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5 text-primary" />
        </div>

        <div className="space-y-1.5 flex-1">
          <h3 className="font-semibold text-base tracking-tight">{tool.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{tool.description}</p>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
          <span className="flex items-center gap-1.5">
            <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
            <span className="group-hover:text-primary transition-colors">Learn more</span>
          </span>
          <span className="ml-auto text-muted-foreground/50">{tool.integrations.length} integrations</span>
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
          <Badge variant="default">Pre-Design Kit</Badge>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold tracking-tight" data-testid="text-prekit-title">
            Research to Prototype
          </h2>
          <p className="text-lg text-muted-foreground">
            10 AI-enhanced tools covering research, persona creation, journey mapping, wireframing, 
            and prototyping. Each tool pairs with AI chat assistants to accelerate your workflow.
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
          <Badge variant="default">Post-Design Kit</Badge>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold tracking-tight" data-testid="text-postkit-title">
            Testing to Handover
          </h2>
          <p className="text-lg text-muted-foreground">
            7 tools for design reviews, developer handover, sprint management, usability testing, 
            and documentation. AI-powered sprint boards keep your team aligned.
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
          <Badge variant="outline">41+ Integrations</Badge>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold tracking-tight" data-testid="text-integrations-title">
            Connects with the tools you already use
          </h2>
          <p className="text-lg text-muted-foreground">
            Figma, Sketch, Miro, Notion, Slack, Jira, GitHub, Zeplin, Storybook, and 30+ more. 
            DesignFlow Kit integrates seamlessly with your existing design and development stack.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {integrations.map((integration) => {
            const integrationId = integration.name.toLowerCase().replace(/\s+/g, '-');
            return (
              <Link key={integration.name} href={`/integration/${integrationId}`}>
                <Card 
                  className="group hover:border-primary/30 transition-colors cursor-pointer h-full"
                  data-testid={`card-integration-${integration.name.toLowerCase()}`}
                >
                  <CardContent className="p-4 text-center space-y-2">
                    <div className="w-12 h-12 mx-auto rounded-xl bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <span className="text-lg font-bold text-muted-foreground group-hover:text-primary transition-colors">
                        {integration.name.charAt(0)}
                      </span>
                    </div>
                    <p className="font-medium text-sm group-hover:text-primary transition-colors">{integration.name}</p>
                    <p className="text-xs text-muted-foreground">{integration.category}</p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        <div className="text-center">
          <Link href="/integrations">
            <Button variant="outline" className="gap-2" data-testid="button-view-integrations">
              View all integrations
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
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
              Evaluate UX in minutes
            </h2>
            <p className="text-lg text-muted-foreground">
              Clone the repo, install dependencies, and start building. AI-powered chat tools, 
              sprint boards, and the full design toolkit are ready to use immediately.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link href="/docs">
                <Button size="lg" className="gap-2 bg-gradient-to-r from-primary to-blue-500 border-0 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30" data-testid="button-read-docs">
                  Read the docs
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline" size="lg" className="backdrop-blur-sm" data-testid="button-view-examples">
                  View examples
                </Button>
              </Link>
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
          Built with love by designers, for designers
        </h2>
        
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          DesignFlow Kit is open source and free forever. Contribute new AI workflows, 
          tool integrations, or UX improvements. Help shape the future of AI-powered design.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <a href="https://github.com/Eaglescrooge/designflow-kit" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="gap-2 bg-gradient-to-r from-primary to-blue-500 border-0 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30" data-testid="button-star-github">
              <Star className="w-5 h-5" />
              Star on GitHub
            </Button>
          </a>
          <a href="https://github.com/Eaglescrooge/designflow-kit" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="lg" className="gap-2 backdrop-blur-sm" data-testid="button-contribute">
              <Github className="w-5 h-5" />
              Contribute
            </Button>
          </a>
        </div>

        <div className="flex items-center justify-center gap-8 pt-8">
          <div className="text-center">
            <p className="font-serif text-2xl font-bold flex items-center justify-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /> 203
            </p>
            <p className="text-sm text-muted-foreground">GitHub Stars</p>
          </div>
          <div className="w-px h-12 bg-border" />
          <div className="text-center">
            <p className="font-serif text-2xl font-bold flex items-center justify-center gap-1">
              <GitFork className="w-4 h-4 text-muted-foreground" /> 158
            </p>
            <p className="text-sm text-muted-foreground">Forks</p>
          </div>
          <div className="w-px h-12 bg-border" />
          <div className="text-center">
            <p className="font-serif text-2xl font-bold">41+</p>
            <p className="text-sm text-muted-foreground">Integrations</p>
          </div>
          <div className="w-px h-12 bg-border" />
          <div className="text-center">
            <p className="font-serif text-2xl font-bold">8</p>
            <p className="text-sm text-muted-foreground">AI Tools</p>
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
            <Link href="/" className="flex items-center gap-2" data-testid="link-footer-logo">
              <img src="/logo.png" alt="DesignFlow Logo" className="w-8 h-8 rounded-full" />
              <span className="font-serif font-bold text-lg">DesignFlow</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              AI-powered open source UX/Product design toolkit. Built by designers, for designers.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://github.com/Eaglescrooge/designflow-kit" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="hover-elevate" data-testid="button-social-github">
                  <SiGithub className="w-5 h-5" />
                </Button>
              </a>
              <a href="https://www.instagram.com/designflowkit/" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="hover-elevate" data-testid="button-social-instagram">
                  <SiInstagram className="w-5 h-5" />
                </Button>
              </a>
              <a href="https://www.linkedin.com/company/designflowkit/" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="hover-elevate" data-testid="button-social-linkedin">
                  <SiLinkedin className="w-5 h-5" />
                </Button>
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-sm">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith('/#') ? (
                    <a 
                      href={link.href} 
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      data-testid={`link-footer-product-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link 
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      data-testid={`link-footer-product-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-sm">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  {'external' in link && link.external ? (
                    <a 
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      data-testid={`link-footer-resources-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {link.label}
                    </a>
                  ) : link.href.startsWith('/#') ? (
                    <a 
                      href={link.href} 
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      data-testid={`link-footer-resources-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link 
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      data-testid={`link-footer-resources-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {link.label}
                    </Link>
                  )}
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
                    target="_blank"
                    rel="noopener noreferrer"
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
