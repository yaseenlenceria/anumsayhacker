import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ChartLine, Play } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { TradingStats } from "@/types/trading";

export default function Hero() {
  const { data: stats } = useQuery<TradingStats>({
    queryKey: ['/api/stats'],
  });

  // Calculate slowly increasing user count
  const getActiveUsers = () => {
    const baseUsers = 2400;
    const targetUsers = 5000;
    const monthsToTarget = 30; // 30 days
    const startDate = new Date('2024-06-01');
    const currentDate = new Date();
    const daysPassed = Math.floor((currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    const dailyIncrease = (targetUsers - baseUsers) / monthsToTarget;
    const currentUsers = Math.min(baseUsers + (dailyIncrease * daysPassed), targetUsers);
    
    return Math.floor(currentUsers).toLocaleString() + '+';
  };

  return (
    <section className="relative py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Professional Trading Signals
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Get real-time trading signals for major binary options platforms with high accuracy rates and instant notifications.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <Link href="/platform/quotex">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 h-auto">
              Quotex
            </Button>
          </Link>
          <Link href="/platform/pocket-option">
            <Button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 h-auto">
              Pocket Option
            </Button>
          </Link>
          <Link href="/platform/iq-option">
            <Button className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-6 py-3 h-auto">
              IQ Option
            </Button>
          </Link>
          <Link href="/platform/binomo">
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-3 h-auto">
              Binomo
            </Button>
          </Link>
          <Link href="/platform/expert-option">
            <Button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 h-auto">
              Expert Option
            </Button>
          </Link>
          <Link href="/platform/olymp">
            <Button className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-6 py-3 h-auto">
              Olymp
            </Button>
          </Link>
        </div>

        {/* Risk Warning */}
        <div className="mb-8 p-4 bg-red-900/20 border border-red-500/30 rounded-lg max-w-2xl mx-auto">
          <p className="text-red-300 font-semibold text-center">
            ⚠️ Risk Warning: Trading involves significant risk. Only use money you can afford to lose.
          </p>
        </div>
        
        {/* Live Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="bg-dark-secondary p-6 rounded-xl border border-gray-700">
            <div className="text-2xl font-bold text-green-500">{stats?.successRate || "89.3%"}</div>
            <div className="text-sm text-gray-400">Success Rate</div>
          </div>
          <div className="bg-dark-secondary p-6 rounded-xl border border-gray-700">
            <div className="text-2xl font-bold text-blue-400">{stats?.activeSignals || 156}</div>
            <div className="text-sm text-gray-400">Active Signals</div>
          </div>
          <div className="bg-dark-secondary p-6 rounded-xl border border-gray-700">
            <div className="text-2xl font-bold text-purple-400">{stats?.platforms || 6}</div>
            <div className="text-sm text-gray-400">Platforms</div>
          </div>
          <div className="bg-dark-secondary p-6 rounded-xl border border-gray-700">
            <div className="text-2xl font-bold text-yellow-400">{getActiveUsers()}</div>
            <div className="text-sm text-gray-400">Active Users</div>
          </div>
        </div>
      </div>
    </section>
  );
}
