import "dotenv/config";

import { migrate } from "drizzle-orm/postgres-js/migrator";

import { db, sql } from "./db";

(async function run() {
  try {
    await migrate(db, {
      migrationsFolder: "drizzle/migrations",
    });
    console.log("Migration completed");
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error("Error performing migration: ", e);
    }

    process.exit(1);
  } finally {
    await sql.end();
  }
})();
