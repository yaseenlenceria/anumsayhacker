import { useState, useEffect } from "react";
import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowUp, ArrowDown, Copy, TrendingUp, TrendingDown, Target, Clock, BarChart, Wallet, Coins, Mountain, Brain, GraduationCap } from "lucide-react";
import { CURRENCY_PAIRS, TIME_FRAMES, type TradingSignal, type CurrencyPair, type TimeFrame, type Platform } from "@/types/trading";
import Header from "@/components/header";
import Footer from "@/components/footer";

const platformIcons = {
  'quotex': BarChart,
  'pocket-option': Wallet,
  'binomo': Coins,
  'olymp': Mountain,
  'iq-option': Brain,
  'expert-option': GraduationCap,
};

const platformGradients = {
  'quotex': 'from-blue-500 to-purple-600',
  'pocket-option': 'from-green-500 to-blue-600',
  'binomo': 'from-yellow-500 to-orange-600',
  'olymp': 'from-red-500 to-pink-600',
  'iq-option': 'from-purple-500 to-indigo-600',
  'expert-option': 'from-teal-500 to-cyan-600',
};

interface BuySellSignal {
  id: number;
  type: 'BUY' | 'SELL';
  pair: string;
  price: string;
  target: string;
  timeFrame: string;
  confidence: number;
  timestamp: Date;
}

export default function PlatformPage() {
  const [, params] = useRoute("/platform/:platformName");
  const platformName = params?.platformName || "";
  
  const [selectedPair, setSelectedPair] = useState<CurrencyPair>('USD/PKR');
  const [selectedTimeFrame, setSelectedTimeFrame] = useState<TimeFrame>('10s');
  const [minStrength, setMinStrength] = useState(80);
  const [buySellSignals, setBuySellSignals] = useState<BuySellSignal[]>([]);

  const { data: platforms } = useQuery<Platform[]>({
    queryKey: ['/api/platforms'],
  });

  const { data: signals, refetch } = useQuery<TradingSignal[]>({
    queryKey: ['/api/signals', { platform: platformName, limit: 15 }],
    refetchInterval: 4000,
  });

  const platform = platforms?.find(p => p.name === platformName);
  const Icon = platformIcons[platformName as keyof typeof platformIcons];
  const gradient = platformGradients[platformName as keyof typeof platformGradients];

  useEffect(() => {
    const generateBuySellSignal = () => {
      const type = Math.random() > 0.5 ? 'BUY' : 'SELL';
      const pair = CURRENCY_PAIRS[Math.floor(Math.random() * CURRENCY_PAIRS.length)];
      const basePrice = Math.random() * 100 + 50;
      const targetAdjustment = type === 'BUY' ? Math.random() * 5 + 2 : -(Math.random() * 5 + 2);
      
      const newSignal: BuySellSignal = {
        id: Date.now(),
        type,
        pair,
        price: basePrice.toFixed(5),
        target: (basePrice + targetAdjustment).toFixed(5),
        timeFrame: TIME_FRAMES[Math.floor(Math.random() * TIME_FRAMES.length)],
        confidence: Math.floor(Math.random() * 20) + 80,
        timestamp: new Date()
      };

      setBuySellSignals(prev => [newSignal, ...prev.slice(0, 7)]);
    };

    // Generate initial signals
    for (let i = 0; i < 3; i++) {
      setTimeout(() => generateBuySellSignal(), i * 1500);
    }

    const interval = setInterval(() => {
      generateBuySellSignal();
    }, Math.random() * 8000 + 6000);

    return () => clearInterval(interval);
  }, [platformName]);

  const filteredSignals = signals?.filter(signal => 
    signal.strength >= minStrength && 
    (selectedPair === 'USD/PKR' || signal.pair === selectedPair)
  ) || [];

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const copySignal = (signal: TradingSignal) => {
    const signalText = `${signal.direction} ${signal.pair} | Strength: ${signal.strength}% | Platform: ${platform?.displayName}`;
    navigator.clipboard.writeText(signalText);
  };

  if (!platform) {
    return (
      <div className="min-h-screen bg-dark-primary">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Platform Not Found</h1>
            <p className="text-gray-400">The requested platform does not exist.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-primary">
      <Header />
      
      {/* Platform Header */}
      <section className="py-16 px-4 bg-dark-secondary">
        <div className="max-w-6xl mx-auto text-center">
          <div className={`w-20 h-20 bg-gradient-to-r ${gradient} rounded-xl mx-auto mb-6 flex items-center justify-center`}>
            {Icon && <Icon className="text-white h-10 w-10" />}
          </div>
          <h1 className="text-4xl font-bold mb-4">{platform.displayName}</h1>
          <p className="text-xl text-gray-300 mb-6">
            Professional trading signals with {platform.successRate}% success rate
          </p>
          <div className="flex justify-center space-x-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">{platform.successRate}%</div>
              <div className="text-sm text-gray-400">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{filteredSignals.length}</div>
              <div className="text-sm text-gray-400">Active Signals</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">Live</div>
              <div className="text-sm text-gray-400">Status</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trading Interface */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Panel: Filters */}
            <div className="lg:col-span-1">
              <div className="bg-dark-secondary p-6 rounded-xl border border-gray-700 sticky top-20">
                <h3 className="text-lg font-semibold mb-4">Trading Filters</h3>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-3">Currency Pairs</label>
                  <Select value={selectedPair} onValueChange={(value) => setSelectedPair(value as CurrencyPair)}>
                    <SelectTrigger className="w-full bg-dark-primary border-gray-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CURRENCY_PAIRS.map((pair) => (
                        <SelectItem key={pair} value={pair}>
                          {pair} (OTC)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-3">Time Frame</label>
                  <div className="grid grid-cols-2 gap-2">
                    {TIME_FRAMES.map((timeFrame) => (
                      <Button
                        key={timeFrame}
                        variant={selectedTimeFrame === timeFrame ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedTimeFrame(timeFrame)}
                        className={selectedTimeFrame === timeFrame ? "bg-blue-600 text-white" : "border-gray-600 hover:border-blue-500"}
                      >
                        {timeFrame}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-3">Min. Signal Strength</label>
                  <input
                    type="range"
                    min="60"
                    max="100"
                    value={minStrength}
                    onChange={(e) => setMinStrength(parseInt(e.target.value))}
                    className="w-full accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>60%</span>
                    <span className="text-blue-400">{minStrength}%</span>
                    <span>100%</span>
                  </div>
                </div>
                
                {/* Buy/Sell Signals */}
                <div className="bg-dark-primary p-4 rounded-lg border border-gray-700">
                  <h4 className="font-semibold mb-3 flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                    Live Buy/Sell
                  </h4>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {buySellSignals.slice(0, 4).map((signal) => (
                      <div
                        key={signal.id}
                        className={`p-3 rounded-lg border text-xs ${
                          signal.type === 'BUY' 
                            ? 'bg-green-500/10 border-green-500/30' 
                            : 'bg-red-500/10 border-red-500/30'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center space-x-1">
                            {signal.type === 'BUY' ? (
                              <TrendingUp className="h-3 w-3 text-green-500" />
                            ) : (
                              <TrendingDown className="h-3 w-3 text-red-500" />
                            )}
                            <span className={`font-semibold ${
                              signal.type === 'BUY' ? 'text-green-500' : 'text-red-500'
                            }`}>
                              {signal.type}
                            </span>
                            <span className="text-white">{signal.pair}</span>
                          </div>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">Entry: {signal.price}</span>
                          <span className="text-yellow-400">{signal.confidence}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Panel: Signals */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">Live Signals - {platform.displayName}</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-400">Live Updates</span>
                </div>
              </div>
              
              {/* Signal Cards */}
              <div className="space-y-4">
                {filteredSignals.map((signal) => (
                  <div
                    key={signal.id}
                    className="bg-dark-secondary p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          signal.direction === 'CALL' ? 'bg-green-500' : 'bg-red-500'
                        }`}>
                          {signal.direction === 'CALL' ? (
                            <ArrowUp className="text-black text-lg font-bold" />
                          ) : (
                            <ArrowDown className="text-white text-lg font-bold" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg">{signal.pair}</h4>
                          <p className="text-sm text-gray-400">{platform.displayName} • {signal.timeFrame}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${
                          signal.direction === 'CALL' ? 'text-green-500' : 'text-red-500'
                        }`}>
                          {signal.direction}
                        </div>
                        <div className="text-sm text-gray-400">{formatTime(signal.createdAt)}</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <div className={`text-lg font-semibold ${
                          signal.direction === 'CALL' ? 'text-green-500' : 'text-red-500'
                        }`}>
                          {signal.strength}%
                        </div>
                        <div className="text-xs text-gray-400">Strength</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-blue-400">{signal.volume}</div>
                        <div className="text-xs text-gray-400">Volume</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-purple-400">{signal.volatility}</div>
                        <div className="text-xs text-gray-400">Volatility</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                          signal.strength >= 90 ? 'bg-red-500 text-white' : 
                          signal.strength >= 85 ? 'bg-green-500 text-black' :
                          'bg-yellow-600 text-white'
                        }`}>
                          {signal.strength >= 90 ? 'Hot' : signal.strength >= 85 ? 'New' : 'Moderate'}
                        </span>
                        <span className="text-xs text-gray-400">
                          Entry: {signal.entryPrice}
                        </span>
                      </div>
                      <Button 
                        onClick={() => copySignal(signal)}
                        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 h-auto text-sm"
                      >
                        <Copy className="mr-1 h-3 w-3" />
                        Copy Signal
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              {filteredSignals.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">No signals found matching your criteria</div>
                  <Button 
                    onClick={() => refetch()}
                    variant="outline" 
                    className="bg-dark-secondary hover:bg-gray-600 border-gray-600"
                  >
                    Refresh Signals
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}