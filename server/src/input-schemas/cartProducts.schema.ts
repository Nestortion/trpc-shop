import { z } from "zod";

export const getCartProductsSchema = z.object({
  userId: z
    .string({
      required_error: "userId is required",
    })
    .nanoid(),
});

export const addToCartSchema = z.object({
  userId: z.string({
    required_error: "userId is required",
  }),
  productId: z
    .string({
      required_error: "productId is required",
    })
    .nanoid(),
  quantity: z
    .number({
      required_error: "quantity is required",
    })
    .min(1),
});
