import { useEffect } from "react";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Platforms from "@/components/platforms";
import SignalsDashboard from "@/components/signals-dashboard";
import Performance from "@/components/performance";
import SignalHistory from "@/components/signal-history";
import TopEarners from "@/components/top-earners";
import CTA from "@/components/cta";
import Footer from "@/components/footer";
import LiveNotifications from "@/components/live-notifications";
import BuySellSignals from "@/components/buy-sell-signals";

export default function Home() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen bg-dark-primary">
      <Header />
      <Hero />
      <Platforms />
      <SignalsDashboard />
      <BuySellSignals />
      <TopEarners />
      <Performance />
      <SignalHistory />
      <CTA />
      <Footer />
      <LiveNotifications />
    </div>
  );
}
