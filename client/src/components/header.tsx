import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Bot, Menu, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Platform } from "@/types/trading";

export default function Header() {
  const [showPlatforms, setShowPlatforms] = useState(false);
  
  const { data: platforms } = useQuery<Platform[]>({
    queryKey: ['/api/platforms'],
  });

  return (
    <header className="bg-dark-secondary border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center space-x-3 cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Bot className="text-white text-lg" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">AnumSayHackerBOT</h1>
                <p className="text-xs text-gray-400">Professional Trading Signals</p>
              </div>
            </div>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#signals" className="text-gray-300 hover:text-white transition-colors">Signals</a>
            
            <div className="relative">
              <button 
                onClick={() => setShowPlatforms(!showPlatforms)}
                className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors"
              >
                <span>Platforms</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              
              {showPlatforms && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-dark-primary border border-gray-700 rounded-lg shadow-lg z-10">
                  {platforms?.map((platform) => (
                    <Link key={platform.id} href={`/platform/${platform.name}`}>
                      <div className="px-4 py-2 text-gray-300 hover:text-white hover:bg-dark-secondary transition-colors cursor-pointer">
                        {platform.displayName}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
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
