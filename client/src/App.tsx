import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Dashboard from "@/pages/dashboard";
import ToolDetail from "@/pages/tool-detail";
import IntegrationDetail from "@/pages/integration-detail";
import DocsPage from "@/pages/docs";
import AutomateUX from "@/pages/automate-ux";
import UXResearch from "@/pages/ux-research";
import UXPersonas from "@/pages/ux-personas";
import UXJourneyMaps from "@/pages/ux-journey-maps";
import UXTesting from "@/pages/ux-testing";
import UXWorkshops from "@/pages/ux-workshops";
import UXWireframes from "@/pages/ux-wireframes";
import UXInformationArchitecture from "@/pages/ux-information-architecture";
import UXAIAnalysis from "@/pages/ux-ai-analysis";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/docs" component={DocsPage} />
      <Route path="/automate-ux" component={AutomateUX} />
      <Route path="/automate-ux/research" component={UXResearch} />
      <Route path="/automate-ux/personas" component={UXPersonas} />
      <Route path="/automate-ux/journey-maps" component={UXJourneyMaps} />
      <Route path="/automate-ux/testing" component={UXTesting} />
      <Route path="/automate-ux/workshops" component={UXWorkshops} />
      <Route path="/automate-ux/wireframes" component={UXWireframes} />
      <Route path="/automate-ux/information-architecture" component={UXInformationArchitecture} />
      <Route path="/automate-ux/ai-analysis" component={UXAIAnalysis} />
      <Route path="/tool/:id" component={ToolDetail} />
      <Route path="/integration/:id" component={IntegrationDetail} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="designflow-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
