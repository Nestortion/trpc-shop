import { createCartSchema } from "../input-schemas/cart.schema";
import { publicProcedure } from "../utils/trpc.util";
import { db } from "../db";
import { carts } from "../db/tables/schema";
import { nanoid } from "../utils/nanoid.util";
import { eq } from "drizzle-orm";

export const createCart = publicProcedure
  .input(createCartSchema)
  .mutation(async ({ input, ctx }) => {
    const cartId = nanoid();

    await db.insert(carts).values({
      id: cartId,
      userId: input.userId,
    });
    const newCart = await db.query.carts.findFirst({
      where: eq(carts.id, cartId),
    });
    return newCart;
  });
