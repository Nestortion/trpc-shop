import { z } from "zod";
import { publicProcedure } from "../trpc";

export const getTodos = publicProcedure.query(() => {
  return {
    todos: ["todo 1", "todo 2", "todo 3"],
  };
});

export const createTodo = publicProcedure
  .input(
    z.object({
      title: z.string(),
      userId: z.string(),
      description: z.string(),
    })
  )
  .mutation(({ input, ctx }) => {
    // write todo to db

    return {
      todos: [],
    };
  });
