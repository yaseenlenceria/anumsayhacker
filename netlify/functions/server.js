const express = require('express');
const serverless = require('serverless-http');

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Mock data for signals
const platforms = [
  { id: 1, name: "quotex", displayName: "Quotex", successRate: 89.2, isActive: true },
  { id: 2, name: "pocket-option", displayName: "Pocket Option", successRate: 87.1, isActive: true },
  { id: 3, name: "binomo", displayName: "Binomo", successRate: 85.9, isActive: true },
  { id: 4, name: "olymp", displayName: "Olymp Trade", successRate: 88.4, isActive: true },
  { id: 5, name: "iq-option", displayName: "IQ Option", successRate: 90.2, isActive: true },
  { id: 6, name: "expert-option", displayName: "Expert Option", successRate: 86.7, isActive: true }
];

const currencyPairs = ["EUR/USD", "USD/JPY", "GBP/USD", "USD/CHF", "AUD/USD", "USD/CAD", "USD/PKR", "USD/BRL", "USD/INR"];
let signalId = 1;
let signals = [];

// Generate mock signal
function generateSignal() {
  const platform = platforms[Math.floor(Math.random() * platforms.length)];
  const pair = currencyPairs[Math.floor(Math.random() * currencyPairs.length)];
  const direction = Math.random() > 0.5 ? "CALL" : "PUT";
  const strength = Math.floor(Math.random() * 41) + 60; // 60-100
  const timeFrame = ["5s", "15s", "30s", "1m", "2m", "5m"][Math.floor(Math.random() * 6)];
  
  return {
    id: signalId++,
    pair,
    platform: platform.name,
    direction,
    strength,
    timeFrame,
    timestamp: new Date().toISOString(),
    price: (Math.random() * 2 + 1).toFixed(5)
  };
}

// Routes
app.get('/platforms', (req, res) => {
  res.json(platforms);
});

app.get('/signals', (req, res) => {
  // Keep only recent signals (last 10)
  if (signals.length > 10) {
    signals = signals.slice(-10);
  }
  res.json(signals);
});

app.post('/signals/generate', (req, res) => {
  const newSignal = generateSignal();
  signals.push(newSignal);
  res.json(newSignal);
});

app.get('/stats', (req, res) => {
  const stats = {
    successRate: "89.3%",
    activeSignals: signals.length,
    platforms: platforms.length,
    totalTrades: Math.floor(Math.random() * 1000) + 500
  };
  res.json(stats);
});

// Auth endpoints (simplified for static deployment)
app.post('/auth/validate', (req, res) => {
  res.status(401).json({ success: false, message: "Invalid or expired access key" });
});

app.post('/auth/free-trial', (req, res) => {
  const accessKey = Math.random().toString(36).substring(2, 15);
  res.json({ success: true, accessKey, expiresAt: Date.now() + 20 * 60 * 1000 });
});

app.post('/auth/verify', (req, res) => {
  res.json({ success: true });
});

// Generate initial signals
for (let i = 0; i < 5; i++) {
  signals.push(generateSignal());
}

module.exports.handler = serverless(app);