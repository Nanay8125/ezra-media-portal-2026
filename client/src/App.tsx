import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Article from "./pages/Article";
import Category from "./pages/Category";
import Admin from "./pages/Admin";
import Contact from "./pages/Contact";
import Advertise from "./pages/Advertise";
import Programs from "./pages/Programs";
import LiveTV from "./pages/LiveTV";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

import { PlayerProvider } from "./contexts/PlayerContext";
import LivePlayer from "./components/LivePlayer";
import BreakingNewsAlert from "./components/BreakingNewsAlert";
import CookieConsent from "./components/CookieConsent";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/news/:slug" component={Article} />
      <Route path="/category/:slug" component={Category} />
      <Route path="/contact" component={Contact} />
      <Route path="/advertise" component={Advertise} />
      <Route path="/programs" component={Programs} />
      <Route path="/live-tv" component={LiveTV} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/admin" component={Admin} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <PlayerProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
            <LivePlayer />
            <BreakingNewsAlert />
            <CookieConsent />
          </TooltipProvider>
        </PlayerProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
