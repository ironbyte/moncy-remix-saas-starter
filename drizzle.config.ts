import "dotenv/config";

import type { Config } from "drizzle-kit";

export default {
  dialect: "postgresql",
  schema: "./drizzle/schema.ts",
  out: "./drizzle/migrations",
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
  verbose: true,
  strict: true,
} satisfies Config;
