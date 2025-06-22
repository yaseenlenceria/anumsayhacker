import { accessKeys, type AccessKey, type InsertAccessKey } from "@shared/auth-schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";
import crypto from "crypto";

export interface IAuthStorage {
  // Access key operations
  generateAccessKey(description?: string, expiresAt?: Date): Promise<AccessKey>;
  validateAccessKey(key: string, userAgent?: string, ipAddress?: string): Promise<AccessKey | null>;
  deactivateAccessKey(key: string): Promise<boolean>;
  getAllAccessKeys(): Promise<AccessKey[]>;
  updateKeyUsage(key: string, userAgent?: string, ipAddress?: string): Promise<void>;
}

export class AuthStorage implements IAuthStorage {
  async generateAccessKey(description?: string, expiresAt?: Date): Promise<AccessKey> {
    const key = crypto.randomBytes(32).toString('hex');
    const id = crypto.randomUUID();
    
    const [accessKey] = await db
      .insert(accessKeys)
      .values({
        id,
        key,
        description,
        expiresAt,
        isActive: true,
      })
      .returning();
    
    return accessKey;
  }

  async validateAccessKey(key: string, userAgent?: string, ipAddress?: string): Promise<AccessKey | null> {
    const [accessKey] = await db
      .select()
      .from(accessKeys)
      .where(
        and(
          eq(accessKeys.key, key),
          eq(accessKeys.isActive, true)
        )
      );

    if (!accessKey) {
      return null;
    }

    // Check if key has expired
    if (accessKey.expiresAt && accessKey.expiresAt < new Date()) {
      return null;
    }

    // Update usage information
    await this.updateKeyUsage(key, userAgent, ipAddress);

    return accessKey;
  }

  async updateKeyUsage(key: string, userAgent?: string, ipAddress?: string): Promise<void> {
    await db
      .update(accessKeys)
      .set({
        usedAt: new Date(),
        userAgent,
        ipAddress,
      })
      .where(eq(accessKeys.key, key));
  }

  async deactivateAccessKey(key: string): Promise<boolean> {
    const result = await db
      .update(accessKeys)
      .set({ isActive: false })
      .where(eq(accessKeys.key, key));

    return result.rowCount > 0;
  }

  async getAllAccessKeys(): Promise<AccessKey[]> {
    return await db.select().from(accessKeys);
  }
}

export const authStorage = new AuthStorage();