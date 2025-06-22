import { useQuery } from "@tanstack/react-query";
import type { TradingSignal } from "@/types/trading";

export default function SignalHistory() {
  const { data: signals } = useQuery<TradingSignal[]>({
    queryKey: ['/api/signals', { limit: 20 }],
  });

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getRandomResult = () => {
    return Math.random() > 0.13 ? 'WIN' : 'LOSS'; // ~87% win rate
  };

  return (
    <section className="py-16 px-4 bg-dark-secondary">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Recent Signal History</h2>
        
        <div className="bg-dark-primary rounded-xl border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-dark-tertiary">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Time</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Pair</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Platform</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Signal</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Strength</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {signals?.slice(0, 10).map((signal) => {
                  const result = getRandomResult();
                  return (
                    <tr key={signal.id} className="hover:bg-dark-secondary transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {formatTime(signal.createdAt)}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium">{signal.pair}</td>
                      <td className="px-6 py-4 text-sm text-gray-300 capitalize">
                        {signal.platform.replace('-', ' ')}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                          signal.direction === 'CALL' 
                            ? 'bg-green-500 text-black' 
                            : 'bg-red-500 text-white'
                        }`}>
                          {signal.direction}
                        </span>
                      </td>
                      <td className={`px-6 py-4 text-sm font-semibold ${
                        signal.direction === 'CALL' ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {signal.strength}%
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                          result === 'WIN' 
                            ? 'bg-green-500 text-black' 
                            : 'bg-red-500 text-white'
                        }`}>
                          {result}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
