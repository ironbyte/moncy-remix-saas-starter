import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "~/env.server.ts";
import * as schema from "./schema.ts";

// Disable prefetch as it is not supported for "Transaction" pool mode
export const sql = postgres(env.DATABASE_URL, { prepare: false });

export const db = drizzle(sql, {
  schema,
});
