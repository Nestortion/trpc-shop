import { migrate } from "drizzle-orm/mysql2/migrator";
import { connection, db } from "../db";

// This will run migrations on the database, skipping the ones already applied

(async () => {
  await migrate(db, { migrationsFolder: "./drizzle" });
  await connection.end();
})();
