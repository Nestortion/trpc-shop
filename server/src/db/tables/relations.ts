import { relations } from "drizzle-orm";
import { cartProducts, carts, categories, products } from "./schema";

export const productsRelations = relations(products, ({ one, many }) => ({
  carts: many(carts),
  categories: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
}));

export const cartProductsRelations = relations(cartProducts, ({ one }) => ({
  cart: one(carts, {
    fields: [cartProducts.cartId],
    references: [carts.id],
  }),
  product: one(products, {
    fields: [cartProducts.productId],
    references: [products.id],
  }),
}));

export const cartsRelations = relations(carts, ({ one, many }) => ({
  cartProducts: many(cartProducts),
}));

export const categoryRelations = relations(categories, ({ one, many }) => ({
  products: many(products),
}));
