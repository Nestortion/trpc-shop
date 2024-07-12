import { double, int, mysqlTable, text, varchar } from "drizzle-orm/mysql-core";

export const products = mysqlTable("products", {
  id: varchar("id", { length: 21 }).primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  price: double("price", { precision: 13, scale: 2 }).notNull().$type<number>(),
  stocks: int("stocks").notNull(),
  productDescription: text("product_description"),
  categoryId: varchar("category_id", { length: 21 })
    .notNull()
    .references(() => categories.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  productImg: text("product_img"),
});

export const carts = mysqlTable("carts", {
  id: varchar("id", { length: 21 }).primaryKey(),
  userId: int("user_id").notNull(),
});

export const cartProducts = mysqlTable("cart_products", {
  id: varchar("id", { length: 21 }).primaryKey(),
  cartId: varchar("cart_id", { length: 21 })
    .notNull()
    .references(() => carts.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  productId: varchar("product_id", { length: 21 })
    .notNull()
    .references(() => products.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  quantity: int("quantity").notNull(),
  totalPrice: double("total_price", { precision: 13, scale: 2 })
    .notNull()
    .$type<number>(),
});

export const categories = mysqlTable("categories", {
  id: varchar("id", { length: 21 }).primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
});
