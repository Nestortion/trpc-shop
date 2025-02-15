import { initTRPC } from "@trpc/server";
import { type CreateExpressContextOptions } from "@trpc/server/adapters/express";

export const createContext = ({ req }: CreateExpressContextOptions) => {
  const auth = req.auth;
  if (!auth.userId) {
    throw new Error("Not authenticated");
  }
  return {
    auth,
  };
};
type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create();
export const router = t.router;
export const publicProcedure = t.procedure;
