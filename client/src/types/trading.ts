export interface TradingSignal {
  id: number;
  pair: string;
  platform: string;
  direction: 'CALL' | 'PUT';
  strength: number;
  timeFrame: string;
  entryPrice: string;
  volume: string;
  volatility: string;
  status: string;
  createdAt: Date;
}

export interface Platform {
  id: number;
  name: string;
  displayName: string;
  isActive: boolean;
  successRate: string;
}

export interface TradingStats {
  successRate: string;
  activeSignals: number;
  platforms: number;
  users: string;
  totalSignals: number;
  winRate: number;
  winPercentage: string;
  avgStrength: string;
  bestPair: string;
  peakTime: string;
}

export const CURRENCY_PAIRS = [
  'USD/BRL',
  'USD/ARS', 
  'USD/DZD',
  'USD/COP',
  'CAD/CHF',
  'USD/BDT',
  'USD/PKR',
  'USD/INR',
  'USD/JPY',
  'AUD/JPY',
  'EUR/USD',
  'USD/PHP'
] as const;

export const TIME_FRAMES = [
  '5s',
  '10s',
  '15s', 
  '30s',
  '1m',
  '2m',
  '5m'
] as const;

export type CurrencyPair = typeof CURRENCY_PAIRS[number];
export type TimeFrame = typeof TIME_FRAMES[number];
