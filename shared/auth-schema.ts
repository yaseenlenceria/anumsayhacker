import { pgTable, varchar, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Access keys for paid users
export const accessKeys = pgTable("access_keys", {
  id: varchar("id").primaryKey(),
  key: varchar("key", { length: 64 }).notNull().unique(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  expiresAt: timestamp("expires_at"),
  usedAt: timestamp("used_at"),
  userAgent: varchar("user_agent"),
  ipAddress: varchar("ip_address"),
  description: varchar("description"), // For admin to track which user this key belongs to
});

export const insertAccessKeySchema = createInsertSchema(accessKeys).omit({
  id: true,
  createdAt: true,
});

export type InsertAccessKey = z.infer<typeof insertAccessKeySchema>;
export type AccessKey = typeof accessKeys.$inferSelect;