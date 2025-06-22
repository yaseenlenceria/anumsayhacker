import Header from "@/components/header";
import Hero from "@/components/hero";
import Platforms from "@/components/platforms";
import SignalsDashboard from "@/components/signals-dashboard";
import Performance from "@/components/performance";
import SignalHistory from "@/components/signal-history";
import CTA from "@/components/cta";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-dark-primary">
      <Header />
      <Hero />
      <Platforms />
      <SignalsDashboard />
      <Performance />
      <SignalHistory />
      <CTA />
      <Footer />
    </div>
  );
}
