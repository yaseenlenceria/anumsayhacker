import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { authStorage } from "./auth-storage";
import { insertSignalSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth endpoints
  app.post("/api/auth/validate", async (req, res) => {
    try {
      const { accessKey } = req.body;
      const userAgent = req.headers['user-agent'];
      const ipAddress = req.ip || req.connection.remoteAddress;
      
      const validKey = await authStorage.validateAccessKey(accessKey, userAgent, ipAddress);
      
      if (validKey) {
        res.json({ success: true, message: "Access granted" });
      } else {
        res.status(401).json({ success: false, message: "Invalid or expired access key" });
      }
    } catch (error) {
      console.error("Error validating access key:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  });

  app.post("/api/auth/verify", async (req, res) => {
    try {
      const { accessKey } = req.body;
      const validKey = await authStorage.validateAccessKey(accessKey);
      
      if (validKey) {
        res.json({ success: true });
      } else {
        res.status(401).json({ success: false });
      }
    } catch (error) {
      console.error("Error verifying access key:", error);
      res.status(500).json({ success: false });
    }
  });

  // Admin endpoints
  app.get("/api/admin/keys", async (req, res) => {
    try {
      const keys = await authStorage.getAllAccessKeys();
      res.json(keys);
    } catch (error) {
      console.error("Error fetching access keys:", error);
      res.status(500).json({ message: "Failed to fetch access keys" });
    }
  });

  app.post("/api/admin/keys/generate", async (req, res) => {
    try {
      const { description, expiresAt } = req.body;
      const accessKey = await authStorage.generateAccessKey(
        description,
        expiresAt ? new Date(expiresAt) : undefined
      );
      res.json(accessKey);
    } catch (error) {
      console.error("Error generating access key:", error);
      res.status(500).json({ message: "Failed to generate access key" });
    }
  });

  app.post("/api/admin/keys/deactivate", async (req, res) => {
    try {
      const { key } = req.body;
      const success = await authStorage.deactivateAccessKey(key);
      res.json({ success });
    } catch (error) {
      console.error("Error deactivating access key:", error);
      res.status(500).json({ message: "Failed to deactivate access key" });
    }
  });

  // Get all platforms
  app.get("/api/platforms", async (_req, res) => {
    try {
      const platforms = await storage.getAllPlatforms();
      res.json(platforms);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch platforms" });
    }
  });

  // Get recent signals
  app.get("/api/signals", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 20;
      const platform = req.query.platform as string;
      const pair = req.query.pair as string;

      let signals;
      if (platform) {
        signals = await storage.getSignalsByPlatform(platform, limit);
      } else if (pair) {
        signals = await storage.getSignalsByPair(pair, limit);
      } else {
        signals = await storage.getRecentSignals(limit);
      }

      res.json(signals);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch signals" });
    }
  });

  // Generate mock signal (for development)
  app.post("/api/signals/generate", async (_req, res) => {
    try {
      const currencyPairs = [
        'USD/BRL', 'USD/ARS', 'USD/DZD', 'USD/COP', 'CAD/CHF',
        'USD/BDT', 'USD/PKR', 'USD/INR', 'USD/JPY', 'AUD/JPY',
        'EUR/USD', 'USD/PHP'
      ];

      const platforms = ['quotex', 'pocket-option', 'binomo', 'olymp', 'iq-option', 'expert-option'];
      const directions = ['CALL', 'PUT'];
      const timeFrames = ['5s', '10s', '15s', '30s', '1m', '2m', '5m'];
      const volumes = ['Low', 'Medium', 'High', 'Very High'];
      const volatilities = ['Low', 'Medium', 'High'];

      const mockSignal = {
        pair: currencyPairs[Math.floor(Math.random() * currencyPairs.length)],
        platform: platforms[Math.floor(Math.random() * platforms.length)],
        direction: directions[Math.floor(Math.random() * directions.length)],
        strength: Math.floor(Math.random() * 30) + 70, // 70-100
        timeFrame: timeFrames[Math.floor(Math.random() * timeFrames.length)],
        entryPrice: (Math.random() * 1000 + 1).toFixed(5),
        volume: volumes[Math.floor(Math.random() * volumes.length)],
        volatility: volatilities[Math.floor(Math.random() * volatilities.length)],
        status: 'active'
      };

      const signal = await storage.createSignal(mockSignal);
      res.json(signal);
    } catch (error) {
      res.status(500).json({ message: "Failed to generate signal" });
    }
  });

  // Get stats
  app.get("/api/stats", async (_req, res) => {
    try {
      const signals = await storage.getRecentSignals(500);
      const platforms = await storage.getAllPlatforms();
      
      const stats = {
        successRate: "89.3%",
        activeSignals: signals.filter(s => s.status === 'active').length,
        platforms: platforms.filter(p => p.isActive).length,
        users: "2.4K+",
        totalSignals: signals.length,
        winRate: Math.floor(signals.length * 0.887),
        winPercentage: "88.7%",
        avgStrength: "86.2%",
        bestPair: "EUR/USD",
        peakTime: "14:00-16:00"
      };

      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch stats" });
    }
  });

  const httpServer = createServer(app);

  // Auto-generate signals every 10 seconds
  setInterval(async () => {
    try {
      const currencyPairs = [
        'USD/BRL', 'USD/ARS', 'USD/DZD', 'USD/COP', 'CAD/CHF',
        'USD/BDT', 'USD/PKR', 'USD/INR', 'USD/JPY', 'AUD/JPY',
        'EUR/USD', 'USD/PHP'
      ];

      const platforms = ['quotex', 'pocket-option', 'binomo', 'olymp', 'iq-option', 'expert-option'];
      const directions = ['CALL', 'PUT'];
      const timeFrames = ['5s', '10s', '15s', '30s', '1m', '2m', '5m'];
      const volumes = ['Low', 'Medium', 'High', 'Very High'];
      const volatilities = ['Low', 'Medium', 'High'];

      const mockSignal = {
        pair: currencyPairs[Math.floor(Math.random() * currencyPairs.length)],
        platform: platforms[Math.floor(Math.random() * platforms.length)],
        direction: directions[Math.floor(Math.random() * directions.length)],
        strength: Math.floor(Math.random() * 30) + 70, // 70-100
        timeFrame: timeFrames[Math.floor(Math.random() * timeFrames.length)],
        entryPrice: (Math.random() * 1000 + 1).toFixed(5),
        volume: volumes[Math.floor(Math.random() * volumes.length)],
        volatility: volatilities[Math.floor(Math.random() * volatilities.length)],
        status: 'active'
      };

      await storage.createSignal(mockSignal);
    } catch (error) {
      console.error('Failed to generate auto signal:', error);
    }
  }, 10000);

  return httpServer;
}
