import z from "zod";

export const createProductSchema = z.object({
  name: z.string(),
  price: z.number(),
  stocks: z.number(),
  productDescription: z.string(),
  categoryId: z.string(),
});
