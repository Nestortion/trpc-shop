// db.ts
import { db } from "../db";
import { sql } from "drizzle-orm";

//reset.ts
async function reset() {
  const tableSchema = db._.schema;
  if (!tableSchema) {
    throw new Error("No table schema found");
  }

  console.log("🗑️  Emptying the entire database");
  const queries = Object.values(tableSchema).map((table) => {
    console.log(`🧨 Preparing delete query for table: ${table.dbName}`);
    return sql.raw(`TRUNCATE TABLE ${table.dbName};`);
  });

  console.log("📨 Sending delete queries...");

  await db.transaction(async (tx) => {
    await Promise.all(
      [sql.raw(`SET FOREIGN_KEY_CHECKS = 0;`)]
        .concat(queries)
        .map(async (query) => {
          if (query) await tx.execute(query);
        })
    );
  });

  console.log("✅ Database emptied");
}

reset()
  .then(() => {
    console.log("Reset complete");
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
