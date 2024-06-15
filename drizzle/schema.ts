import { pgSchema, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

const authSchema = pgSchema("auth");

export const users = authSchema.table("users", {
  id: uuid("id").primaryKey(),
});

export const userProfiles = pgTable("user_profiles", {
  id: uuid("id")
    .primaryKey()
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  username: text("name"),
  email: text("email"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Types
export type NewUserProfile = typeof userProfiles.$inferInsert;
export type UserProfile = typeof userProfiles.$inferSelect;
