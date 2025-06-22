import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, Copy, Clock } from "lucide-react";
import type { TradingSignal } from "@/types/trading";

interface SignalCardProps {
  signal: TradingSignal;
  onCopy: (signal: TradingSignal) => void;
  formatTime: (date: Date) => string;
}

export default function SignalCard({ signal, onCopy, formatTime }: SignalCardProps) {
  return (
    <div
      className={`bg-gradient-to-r p-4 rounded-lg border-2 transition-all duration-300 hover:scale-[1.02] shadow-lg ${
        signal.direction === 'CALL' 
          ? 'from-green-900/30 to-green-800/30 border-green-500/60 hover:border-green-400' 
          : 'from-red-900/30 to-red-800/30 border-red-500/60 hover:border-red-400'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
            signal.direction === 'CALL' ? 'bg-green-500' : 'bg-red-500'
          }`}>
            {signal.direction === 'CALL' ? (
              <ArrowUp className="text-white text-base font-bold" />
            ) : (
              <ArrowDown className="text-white text-base font-bold" />
            )}
          </div>
          <div>
            <h3 className="font-bold text-lg text-white">{signal.pair}</h3>
            <p className="text-sm text-gray-300 capitalize">{signal.platform.replace('-', ' ')}</p>
          </div>
        </div>
        <div className="text-right">
          <div className={`text-2xl font-black ${
            signal.direction === 'CALL' ? 'text-green-400' : 'text-red-400'
          }`}>
            {signal.direction}
          </div>
          <div className="flex items-center text-xs text-gray-400">
            <Clock className="w-3 h-3 mr-1" />
            {signal.timeFrame}
          </div>
        </div>
      </div>
      
      {/* Metrics */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-black/30 rounded-lg p-2 text-center border border-gray-600/30">
          <div className={`text-lg font-bold ${
            signal.direction === 'CALL' ? 'text-green-400' : 'text-red-400'
          }`}>
            {signal.strength}%
          </div>
          <div className="text-xs text-gray-400 uppercase tracking-wide">Strength</div>
        </div>
        <div className="bg-black/30 rounded-lg p-2 text-center border border-gray-600/30">
          <div className="text-lg font-bold text-blue-400">{signal.volume}</div>
          <div className="text-xs text-gray-400 uppercase tracking-wide">Volume</div>
        </div>
        <div className="bg-black/30 rounded-lg p-2 text-center border border-gray-600/30">
          <div className="text-lg font-bold text-purple-400">{signal.volatility}</div>
          <div className="text-xs text-gray-400 uppercase tracking-wide">Risk</div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className={`px-3 py-1 text-xs rounded-full font-bold uppercase tracking-wide ${
            signal.strength >= 90 ? 'bg-red-500 text-white shadow-lg' : 
            signal.strength >= 85 ? 'bg-green-500 text-black shadow-lg' :
            'bg-yellow-600 text-white shadow-lg'
          }`}>
            {signal.strength >= 90 ? '🔥 HOT' : signal.strength >= 85 ? '⚡ NEW' : '📊 OK'}
          </span>
          <span className="text-xs text-gray-300 font-medium">
            Entry: {signal.entryPrice}
          </span>
        </div>
        <Button 
          onClick={() => onCopy(signal)}
          size="sm"
          className={`font-semibold shadow-lg transition-all ${
            signal.direction === 'CALL' 
              ? 'bg-green-600 hover:bg-green-500 text-white' 
              : 'bg-red-600 hover:bg-red-500 text-white'
          }`}
        >
          <Copy className="mr-1 h-3 w-3" />
          COPY
        </Button>
      </div>
      
      {/* Time indicator */}
      <div className="mt-2 text-right">
        <span className="text-xs text-gray-500">{formatTime(signal.createdAt)}</span>
      </div>
    </div>
  );
}