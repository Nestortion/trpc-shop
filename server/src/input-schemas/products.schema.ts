import z from "zod";

export const createProductSchema = z.object({
  productId: z.string(),
  name: z.string(),
  price: z.number(),
  stocks: z.number(),
  productDescription: z.string(),
});
