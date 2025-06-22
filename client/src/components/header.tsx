import { Button } from "@/components/ui/button";
import { Bot, Menu } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-dark-secondary border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Bot className="text-white text-lg" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">AnumSayHackerBOT</h1>
              <p className="text-xs text-gray-400">Professional Trading Signals</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#signals" className="text-gray-300 hover:text-white transition-colors">Signals</a>
            <a href="#platforms" className="text-gray-300 hover:text-white transition-colors">Platforms</a>
            <a href="#performance" className="text-gray-300 hover:text-white transition-colors">Performance</a>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Get Started
            </Button>
          </nav>
          <Button variant="ghost" size="icon" className="md:hidden text-white">
            <Menu />
          </Button>
        </div>
      </div>
    </header>
  );
}
