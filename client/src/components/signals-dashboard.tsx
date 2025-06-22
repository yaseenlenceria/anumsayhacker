import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowUp, ArrowDown, Copy } from "lucide-react";
import { CURRENCY_PAIRS, TIME_FRAMES, type TradingSignal, type CurrencyPair, type TimeFrame } from "@/types/trading";

export default function SignalsDashboard() {
  const [selectedPair, setSelectedPair] = useState<CurrencyPair>('USD/PKR');
  const [selectedTimeFrame, setSelectedTimeFrame] = useState<TimeFrame>('10s');
  const [minStrength, setMinStrength] = useState(80);
  const [lastUpdated, setLastUpdated] = useState("2 seconds ago");

  const { data: signals, refetch } = useQuery<TradingSignal[]>({
    queryKey: ['/api/signals', { pair: selectedPair, limit: 10 }],
    refetchInterval: 5000, // Refetch every 5 seconds
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const seconds = Math.floor(Math.random() * 10) + 1;
      setLastUpdated(`${seconds} seconds ago`);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const filteredSignals = signals?.filter(signal => signal.strength >= minStrength) || [];

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const copySignal = (signal: TradingSignal) => {
    const signalText = `${signal.direction} ${signal.pair} | Strength: ${signal.strength}% | Platform: ${signal.platform}`;
    navigator.clipboard.writeText(signalText);
  };

  return (
    <section id="signals" className="py-16 px-4 bg-dark-secondary">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Panel: Filters */}
          <div className="lg:w-1/4">
            <div className="bg-dark-primary p-6 rounded-xl border border-gray-700 sticky top-20">
              <h3 className="text-lg font-semibold mb-4">Filters</h3>
              
              {/* Currency Pairs */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-3">Currency Pairs</label>
                <Select value={selectedPair} onValueChange={(value) => setSelectedPair(value as CurrencyPair)}>
                  <SelectTrigger className="w-full bg-dark-secondary border-gray-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CURRENCY_PAIRS.map((pair) => (
                      <SelectItem key={pair} value={pair}>
                        {pair} (OTC) {pair === selectedPair ? '✓' : ''}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Time Frames */}
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
                      {timeFrame} {selectedTimeFrame === timeFrame ? '✓' : ''}
                    </Button>
                  ))}
                </div>
              </div>
              
              {/* Signal Strength */}
              <div>
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
            </div>
          </div>
          
          {/* Right Panel: Signals */}
          <div className="lg:w-3/4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <h3 className="text-2xl font-bold">Live Signals</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-400">Live</span>
                </div>
              </div>
              <div className="text-sm text-gray-400">
                Last updated: <span>{lastUpdated}</span>
              </div>
            </div>
            
            {/* Signal Cards */}
            <div className="space-y-4">
              {filteredSignals.map((signal) => (
                <div
                  key={signal.id}
                  className="bg-dark-primary p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-colors"
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
                        <p className="text-sm text-gray-400">{signal.platform} • {signal.timeFrame}</p>
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
                        Entry Price: <span>{signal.entryPrice}</span>
                      </span>
                    </div>
                    <Button 
                      onClick={() => copySignal(signal)}
                      className="bg-blue-600 hover:bg-blue-700 px-4 py-2 h-auto text-sm"
                    >
                      <Copy className="mr-1 h-3 w-3" />
                      Copy
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Load More Button */}
            <div className="text-center mt-8">
              <Button 
                onClick={() => refetch()}
                variant="outline" 
                className="bg-dark-tertiary hover:bg-gray-600 border-gray-600"
              >
                Load More Signals
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
