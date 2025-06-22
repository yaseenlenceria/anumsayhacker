import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import PlatformPage from "@/pages/platform";
import Pricing from "@/pages/pricing";
import FAQ from "@/pages/faq";
import Contact from "@/pages/contact";
import Support from "@/pages/support";
import Terms from "@/pages/terms";
import Privacy from "@/pages/privacy";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/platform/:platformName" component={PlatformPage} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/faq" component={FAQ} />
      <Route path="/contact" component={Contact} />
      <Route path="/support" component={Support} />
      <Route path="/terms" component={Terms} />
      <Route path="/privacy" component={Privacy} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
