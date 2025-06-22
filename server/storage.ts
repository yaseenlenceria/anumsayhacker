import { signals, platforms, users, type Signal, type Platform, type User, type InsertSignal, type InsertPlatform, type InsertUser } from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

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

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getRecentSignals(limit: number = 20): Promise<Signal[]> {
    return await db
      .select()
      .from(signals)
      .orderBy(desc(signals.createdAt))
      .limit(limit);
  }

  async getSignalsByPlatform(platform: string, limit: number = 20): Promise<Signal[]> {
    return await db
      .select()
      .from(signals)
      .where(eq(signals.platform, platform))
      .orderBy(desc(signals.createdAt))
      .limit(limit);
  }

  async getSignalsByPair(pair: string, limit: number = 20): Promise<Signal[]> {
    return await db
      .select()
      .from(signals)
      .where(eq(signals.pair, pair))
      .orderBy(desc(signals.createdAt))
      .limit(limit);
  }

  async createSignal(insertSignal: InsertSignal): Promise<Signal> {
    const [signal] = await db
      .insert(signals)
      .values({
        ...insertSignal,
        entryPrice: insertSignal.entryPrice || (Math.random() * 1000 + 1).toFixed(5),
        status: insertSignal.status || 'active'
      })
      .returning();
    return signal;
  }

  async updateSignalStatus(id: number, status: string): Promise<Signal | undefined> {
    const [signal] = await db
      .update(signals)
      .set({ status })
      .where(eq(signals.id, id))
      .returning();
    return signal || undefined;
  }

  async getAllPlatforms(): Promise<Platform[]> {
    return await db.select().from(platforms);
  }

  async getPlatform(name: string): Promise<Platform | undefined> {
    const [platform] = await db.select().from(platforms).where(eq(platforms.name, name));
    return platform || undefined;
  }

  async createPlatform(insertPlatform: InsertPlatform): Promise<Platform> {
    const [platform] = await db
      .insert(platforms)
      .values({
        ...insertPlatform,
        isActive: insertPlatform.isActive ?? true,
        successRate: insertPlatform.successRate || null
      })
      .returning();
    return platform;
  }

  async updatePlatformSuccessRate(name: string, successRate: number): Promise<Platform | undefined> {
    const [platform] = await db
      .update(platforms)
      .set({ successRate: successRate.toString() })
      .where(eq(platforms.name, name))
      .returning();
    return platform || undefined;
  }
}

export const storage = new DatabaseStorage();
