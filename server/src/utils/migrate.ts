import { migrate } from "drizzle-orm/neon-http/migrator";
import { db } from "../db";

// This will run migrations on the database, skipping the ones already applied

(async () => {
  await migrate(db, { migrationsFolder: "./drizzle" });
})();
