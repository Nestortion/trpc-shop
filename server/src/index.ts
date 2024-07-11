import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import cors from "cors";
import express from "express";
import { procedures } from "./procedures";
import { createContext, router } from "./utils/trpc";

const appRouter = router(procedures);

const app = express();

app.use(cors());
app.use(express.json());

app.use(ClerkExpressWithAuth());

app.use(
  "/trpc",
  ClerkExpressWithAuth({
    onError: (err) => {
      console.error(err);
    },
  }),
  createExpressMiddleware({ router: appRouter, createContext: createContext })
);

app.listen(3000, () => {
  console.log("server is running on port 3000");
});

export type AppRouter = typeof appRouter;
