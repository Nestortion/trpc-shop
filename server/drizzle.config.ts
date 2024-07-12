export default {
  schema: "./src/db/tables/*",
  out: "./drizzle",
  dialect: "mysql",
  dbCredentials: {
    url: process.env.DRIZZLE_DB_URL,
  },
};
