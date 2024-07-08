import { procedures } from "./procedures";
import { router } from "./trpc";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import cors from "cors";
import express from "express";

const appRouter = router(procedures);

const app = express();

app.use(cors());

app.use("/trpc", createExpressMiddleware({ router: appRouter }));

app.listen(3000, () => {
  console.log("server is running on port 3000");
});

export type AppRouter = typeof appRouter;
