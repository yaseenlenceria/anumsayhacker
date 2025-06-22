import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AuthWrapper from "@/components/auth-wrapper";
import Home from "@/pages/home";
import PlatformPage from "@/pages/platform";
import Pricing from "@/pages/pricing";
import FAQ from "@/pages/faq";
import Contact from "@/pages/contact";
import Support from "@/pages/support";
import Terms from "@/pages/terms";
import Privacy from "@/pages/privacy";
import Login from "@/pages/login";
import Admin from "@/pages/admin";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/123admin" component={Admin} />
      <Route path="/">
        <AuthWrapper>
          <Home />
        </AuthWrapper>
      </Route>
      <Route path="/platform/:platformName">
        <AuthWrapper>
          <PlatformPage />
        </AuthWrapper>
      </Route>
      <Route path="/pricing">
        <AuthWrapper>
          <Pricing />
        </AuthWrapper>
      </Route>
      <Route path="/faq">
        <AuthWrapper>
          <FAQ />
        </AuthWrapper>
      </Route>
      <Route path="/contact">
        <AuthWrapper>
          <Contact />
        </AuthWrapper>
      </Route>
      <Route path="/support">
        <AuthWrapper>
          <Support />
        </AuthWrapper>
      </Route>
      <Route path="/terms">
        <AuthWrapper>
          <Terms />
        </AuthWrapper>
      </Route>
      <Route path="/privacy">
        <AuthWrapper>
          <Privacy />
        </AuthWrapper>
      </Route>
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
