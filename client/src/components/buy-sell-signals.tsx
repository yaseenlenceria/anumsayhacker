import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Clock, Target } from "lucide-react";

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

export default function BuySellSignals() {
  const [signals, setSignals] = useState<BuySellSignal[]>([]);

  const pairs = ["USD/BRL", "EUR/USD", "USD/JPY", "GBP/USD", "USD/CAD", "AUD/USD", "USD/CHF"];
  const timeFrames = ["1m", "2m", "5m"];

  useEffect(() => {
    const generateSignal = () => {
      const type = Math.random() > 0.5 ? 'BUY' : 'SELL';
      const pair = pairs[Math.floor(Math.random() * pairs.length)];
      const basePrice = Math.random() * 100 + 50;
      const targetAdjustment = type === 'BUY' ? Math.random() * 5 + 2 : -(Math.random() * 5 + 2);
      
      const newSignal: BuySellSignal = {
        id: Date.now(),
        type,
        pair,
        price: basePrice.toFixed(5),
        target: (basePrice + targetAdjustment).toFixed(5),
        timeFrame: timeFrames[Math.floor(Math.random() * timeFrames.length)],
        confidence: Math.floor(Math.random() * 20) + 80, // 80-100%
        timestamp: new Date()
      };

      setSignals(prev => [newSignal, ...prev.slice(0, 9)]);
    };

    // Generate initial signals
    for (let i = 0; i < 3; i++) {
      setTimeout(() => generateSignal(), i * 1000);
    }

    // Generate new signal every 6-12 seconds
    const interval = setInterval(() => {
      generateSignal();
    }, Math.random() * 6000 + 6000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Live Buy/Sell Signals</h2>
        <div className="bg-dark-secondary p-6 rounded-xl border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Real-Time Trading Signals</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-400">Live</span>
            </div>
          </div>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {signals.map((signal, index) => (
          <div
            key={signal.id}
            className={`p-4 rounded-lg border transition-all duration-500 ${
              signal.type === 'BUY' 
                ? 'bg-green-500/10 border-green-500/30' 
                : 'bg-red-500/10 border-red-500/30'
            } ${index === 0 ? 'animate-pulse' : ''}`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                {signal.type === 'BUY' ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
                <span className={`font-semibold ${
                  signal.type === 'BUY' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {signal.type}
                </span>
                <span className="font-medium text-white">{signal.pair}</span>
              </div>
              <span className="text-xs text-gray-400">{formatTime(signal.timestamp)}</span>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-gray-400">Entry</div>
                <div className="font-medium text-blue-400">{signal.price}</div>
              </div>
              <div>
                <div className="text-gray-400">Target</div>
                <div className={`font-medium ${
                  signal.type === 'BUY' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {signal.target}
                </div>
              </div>
              <div>
                <div className="text-gray-400">Time</div>
                <div className="font-medium text-purple-400">{signal.timeFrame}</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center space-x-1">
                <Target className="h-3 w-3 text-yellow-400" />
                <span className="text-xs text-yellow-400">
                  Confidence: {signal.confidence}%
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3 text-gray-400" />
                <span className="text-xs text-gray-400">{signal.timeFrame} expiry</span>
              </div>
            </div>
          </div>
        ))}
        </div>
        </div>
      </div>
    </section>
  );
}