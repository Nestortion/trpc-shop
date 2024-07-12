import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import cors from "cors";
import express from "express";
import { procedures } from "./procedures";
import { createContext, router } from "./utils/trpc.util";
import "dotenv/config";

const appRouter = router(procedures);

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);
app.use(express.json());

app.use(
  "/trpc",
  ClerkExpressWithAuth({
    onError: (err) => {
      console.log(err);
      throw err;
    },
  }),
  createExpressMiddleware({ router: appRouter, createContext: createContext })
);

app.listen(3000, () => {
  console.log("server is running on port 3000");
});

export type AppRouter = typeof appRouter;
