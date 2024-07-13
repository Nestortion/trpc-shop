import { z } from "zod";

export const createCartSchema = z.object({
  productId: z.string(),
  userId: z
    .string({
      required_error: "userId is required",
    })
    .nanoid(),
});
