import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import "dotenv/config";
import * as schema from "../db/tables/schema";
import * as relations from "../db/tables/relations";

const DB_URL = process.env.DRIZZLE_DB_URL;

if (!DB_URL) {
  throw new Error("No DB_URL provided");
}

export const sql = neon(DB_URL);

export const db = drizzle(sql, {
  schema: {
    ...schema,
    ...relations,
  },
});
