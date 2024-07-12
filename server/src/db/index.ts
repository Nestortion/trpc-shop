import "dotenv/config";
import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";
import * as relations from "../db/tables/relations";
import * as schema from "../db/tables/schema";

const DB_URL = process.env.DRIZZLE_DB_URL;

if (!DB_URL) {
  throw new Error("No DB_URL provided");
}

export const connection = mysql.createPool({
  uri: DB_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const db = drizzle(connection, {
  schema: {
    ...schema,
    ...relations,
  },
  mode: "default",
});
