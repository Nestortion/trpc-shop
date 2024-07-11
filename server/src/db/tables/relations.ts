import { relations } from "drizzle-orm";
import { cartProducts, carts, products } from "./schema";

export const productsRelations = relations(products, ({ one, many }) => ({
  carts: many(carts),
}));

export const cartProductsRelations = relations(cartProducts, ({ one }) => ({
  cart: one(carts, {
    fields: [cartProducts.cartId],
    references: [carts.id],
  }),
  product: one(products, {
    fields: [cartProducts.productId],
    references: [products.productId],
  }),
}));

export const cartsRelations = relations(carts, ({ one, many }) => ({
  cartProducts: many(cartProducts),
}));
