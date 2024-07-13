import { eq } from "drizzle-orm";
import { db } from "../db";
import {
  addToCartSchema,
  getCartProductsSchema,
} from "../input-schemas/cartProducts.schema";
import { publicProcedure } from "../utils/trpc.util";
import { cartProducts, carts, products } from "../db/tables/schema";
import { nanoid } from "../utils/nanoid.util";

export const getCartProducts = publicProcedure
  .input(getCartProductsSchema)
  .query(async ({ input }) => {
    const cart = await db.query.carts.findFirst({
      where: eq(carts.userId, input.userId),
    });

    let cartId = "";
    if (!cart) {
      cartId = nanoid();
      await db.insert(carts).values({
        id: cartId,
        userId: input.userId,
      });
    }

    const allCartProducts = await db.query.cartProducts.findMany({
      where: eq(cartProducts.cartId, cart?.id ?? cartId),
    });
    return allCartProducts;
  });

export const addToCart = publicProcedure
  .input(addToCartSchema)
  .mutation(async ({ input }) => {
    const cartProductId = nanoid();

    const cart = await db.query.carts.findFirst({
      where: eq(carts.userId, input.userId),
    });

    let cartId = "";
    if (!cart) {
      cartId = nanoid();
      await db.insert(carts).values({
        id: cartId,
        userId: input.userId,
      });
    }

    const product = await db.query.products.findFirst({
      where: eq(products.id, input.productId),
    });
    await db.insert(cartProducts).values({
      id: cartProductId,
      cartId: cart?.id ?? cartId,
      productId: input.productId,
      quantity: input.quantity,
      totalPrice: input.quantity * product!.price,
    });

    const cartProduct = await db.query.cartProducts.findFirst({
      where: eq(cartProducts.id, cartProductId),
      with: {
        product: true,
      },
    });

    return cartProduct;
  });
