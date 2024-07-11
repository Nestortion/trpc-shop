export default {
  schema: "./src/db/tables/*",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DRIZZLE_DB_URL,
  },
};
