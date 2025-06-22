import { signals, platforms, users, type Signal, type Platform, type User, type InsertSignal, type InsertPlatform, type InsertUser } from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Signal methods
  getRecentSignals(limit?: number): Promise<Signal[]>;
  getSignalsByPlatform(platform: string, limit?: number): Promise<Signal[]>;
  getSignalsByPair(pair: string, limit?: number): Promise<Signal[]>;
  createSignal(signal: InsertSignal): Promise<Signal>;
  updateSignalStatus(id: number, status: string): Promise<Signal | undefined>;

  // Platform methods
  getAllPlatforms(): Promise<Platform[]>;
  getPlatform(name: string): Promise<Platform | undefined>;
  createPlatform(platform: InsertPlatform): Promise<Platform>;
  updatePlatformSuccessRate(name: string, successRate: number): Promise<Platform | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private signals: Map<number, Signal>;
  private platforms: Map<string, Platform>;
  currentUserId: number;
  currentSignalId: number;
  currentPlatformId: number;

  constructor() {
    this.users = new Map();
    this.signals = new Map();
    this.platforms = new Map();
    this.currentUserId = 1;
    this.currentSignalId = 1;
    this.currentPlatformId = 1;

    // Initialize platforms
    this.initializePlatforms();
  }

  private initializePlatforms() {
    const platformData = [
      { name: 'quotex', displayName: 'Quotex', successRate: '89.3' },
      { name: 'pocket-option', displayName: 'Pocket Option', successRate: '90.1' },
      { name: 'binomo', displayName: 'Binomo', successRate: '85.4' },
      { name: 'olymp', displayName: 'Olymp', successRate: '87.8' },
      { name: 'iq-option', displayName: 'IQ Option', successRate: '91.7' },
      { name: 'expert-option', displayName: 'Expert Option', successRate: '88.6' },
    ];

    platformData.forEach(data => {
      const platform: Platform = {
        id: this.currentPlatformId++,
        name: data.name,
        displayName: data.displayName,
        isActive: true,
        successRate: data.successRate,
      };
      this.platforms.set(data.name, platform);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getRecentSignals(limit: number = 20): Promise<Signal[]> {
    const signals = Array.from(this.signals.values())
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime())
      .slice(0, limit);
    return signals;
  }

  async getSignalsByPlatform(platform: string, limit: number = 20): Promise<Signal[]> {
    const signals = Array.from(this.signals.values())
      .filter(signal => signal.platform === platform)
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime())
      .slice(0, limit);
    return signals;
  }

  async getSignalsByPair(pair: string, limit: number = 20): Promise<Signal[]> {
    const signals = Array.from(this.signals.values())
      .filter(signal => signal.pair === pair)
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime())
      .slice(0, limit);
    return signals;
  }

  async createSignal(insertSignal: InsertSignal): Promise<Signal> {
    const id = this.currentSignalId++;
    const signal: Signal = { 
      ...insertSignal,
      id, 
      createdAt: new Date(),
      entryPrice: insertSignal.entryPrice || (Math.random() * 1000 + 1).toFixed(5),
      status: insertSignal.status || 'active'
    };
    this.signals.set(id, signal);
    return signal;
  }

  async updateSignalStatus(id: number, status: string): Promise<Signal | undefined> {
    const signal = this.signals.get(id);
    if (signal) {
      signal.status = status;
      this.signals.set(id, signal);
      return signal;
    }
    return undefined;
  }

  async getAllPlatforms(): Promise<Platform[]> {
    return Array.from(this.platforms.values());
  }

  async getPlatform(name: string): Promise<Platform | undefined> {
    return this.platforms.get(name);
  }

  async createPlatform(insertPlatform: InsertPlatform): Promise<Platform> {
    const id = this.currentPlatformId++;
    const platform: Platform = { 
      ...insertPlatform, 
      id,
      isActive: insertPlatform.isActive ?? true,
      successRate: insertPlatform.successRate || null
    };
    this.platforms.set(platform.name, platform);
    return platform;
  }

  async updatePlatformSuccessRate(name: string, successRate: number): Promise<Platform | undefined> {
    const platform = this.platforms.get(name);
    if (platform) {
      platform.successRate = successRate.toString();
      this.platforms.set(name, platform);
      return platform;
    }
    return undefined;
  }
}

export const storage = new MemStorage();
