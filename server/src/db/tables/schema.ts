import {
  doublePrecision,
  integer,
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  productId: varchar("product_id", { length: 100 }).notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  price: doublePrecision("price").notNull(),
  stocks: integer("stocks").notNull(),
  productDescription: varchar("product_description", { length: 1000 }),
});

export const carts = pgTable("carts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
});

export const cartProducts = pgTable("cart_products", {
  id: serial("id").primaryKey(),
  cartId: integer("cart_id").notNull(),
  productId: integer("product_id").notNull(),
  quantity: integer("quantity").notNull(),
  totalPrice: doublePrecision("total_price").notNull(),
});
