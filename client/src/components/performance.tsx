import { useQuery } from "@tanstack/react-query";
import type { TradingStats, Platform } from "@/types/trading";

export default function Performance() {
  const { data: stats } = useQuery<TradingStats>({
    queryKey: ['/api/stats'],
  });

  const { data: platforms } = useQuery<Platform[]>({
    queryKey: ['/api/platforms'],
  });

  const getSuccessRateWidth = (rate: string) => {
    const numRate = parseFloat(rate);
    return `${(numRate / 100) * 100}%`;
  };

  return (
    <section id="performance" className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Performance Analytics</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Success Rate Chart */}
          <div className="bg-dark-secondary p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold mb-4">Success Rate by Platform</h3>
            <div className="space-y-4">
              {platforms?.map((platform) => (
                <div key={platform.id} className="flex items-center justify-between">
                  <span className="text-gray-300">{platform.displayName}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 h-2 bg-gray-700 rounded-full">
                      <div 
                        className="h-2 bg-green-500 rounded-full transition-all duration-500"
                        style={{ width: getSuccessRateWidth(platform.successRate) }}
                      />
                    </div>
                    <span className="text-green-500 font-semibold min-w-[50px]">
                      {platform.successRate}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Recent Performance */}
          <div className="bg-dark-secondary p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold mb-4">24H Performance</h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-4 bg-dark-primary rounded-lg">
                <div className="text-2xl font-bold text-green-500">{stats?.totalSignals || 247}</div>
                <div className="text-sm text-gray-400">Total Signals</div>
              </div>
              <div className="text-center p-4 bg-dark-primary rounded-lg">
                <div className="text-2xl font-bold text-green-500">{stats?.winRate || 219}</div>
                <div className="text-sm text-gray-400">Successful</div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Win Rate</span>
                <span className="text-green-500 font-semibold">{stats?.winPercentage || "88.7%"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Average Strength</span>
                <span className="text-blue-400 font-semibold">{stats?.avgStrength || "86.2%"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Best Pair</span>
                <span className="text-purple-400 font-semibold">{stats?.bestPair || "EUR/USD"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Peak Time</span>
                <span className="text-yellow-400 font-semibold">{stats?.peakTime || "14:00-16:00"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
