"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
module.exports = __toCommonJS(src_exports);
var import_clerk_sdk_node = require("@clerk/clerk-sdk-node");
var import_express = require("@trpc/server/adapters/express");
var import_cors = __toESM(require("cors"));
var import_express2 = __toESM(require("express"));

// src/db/index.ts
var import_serverless = require("@neondatabase/serverless");
var import_neon_http = require("drizzle-orm/neon-http");
var import_config = require("dotenv/config");

// src/db/tables/schema.ts
var schema_exports = {};
__export(schema_exports, {
  cartProducts: () => cartProducts,
  carts: () => carts,
  products: () => products
});
var import_pg_core = require("drizzle-orm/pg-core");
var products = (0, import_pg_core.pgTable)("products", {
  id: (0, import_pg_core.serial)("id").primaryKey(),
  productId: (0, import_pg_core.varchar)("product_id", { length: 100 }).notNull(),
  name: (0, import_pg_core.varchar)("name", { length: 100 }).notNull(),
  price: (0, import_pg_core.doublePrecision)("price").notNull(),
  stocks: (0, import_pg_core.integer)("stocks").notNull(),
  productDescription: (0, import_pg_core.varchar)("product_description", { length: 1e3 })
});
var carts = (0, import_pg_core.pgTable)("carts", {
  id: (0, import_pg_core.serial)("id").primaryKey(),
  userId: (0, import_pg_core.integer)("user_id").notNull()
});
var cartProducts = (0, import_pg_core.pgTable)("cart_products", {
  id: (0, import_pg_core.serial)("id").primaryKey(),
  cartId: (0, import_pg_core.integer)("cart_id").notNull(),
  productId: (0, import_pg_core.integer)("product_id").notNull(),
  quantity: (0, import_pg_core.integer)("quantity").notNull(),
  totalPrice: (0, import_pg_core.doublePrecision)("total_price").notNull()
});

// src/db/tables/relations.ts
var relations_exports = {};
__export(relations_exports, {
  cartProductsRelations: () => cartProductsRelations,
  cartsRelations: () => cartsRelations,
  productsRelations: () => productsRelations
});
var import_drizzle_orm = require("drizzle-orm");
var productsRelations = (0, import_drizzle_orm.relations)(products, ({ one, many }) => ({
  carts: many(carts)
}));
var cartProductsRelations = (0, import_drizzle_orm.relations)(cartProducts, ({ one }) => ({
  cart: one(carts, {
    fields: [cartProducts.cartId],
    references: [carts.id]
  }),
  product: one(products, {
    fields: [cartProducts.productId],
    references: [products.productId]
  })
}));
var cartsRelations = (0, import_drizzle_orm.relations)(carts, ({ one, many }) => ({
  cartProducts: many(cartProducts)
}));

// src/db/index.ts
var DB_URL = process.env.DRIZZLE_DB_URL;
if (!DB_URL) {
  throw new Error("No DB_URL provided");
}
var sql = (0, import_serverless.neon)(DB_URL);
var db = (0, import_neon_http.drizzle)(sql, {
  schema: {
    ...schema_exports,
    ...relations_exports
  }
});

// src/input-schemas/products.schema.ts
var import_zod = __toESM(require("zod"));
var createProductSchema = import_zod.default.object({
  productId: import_zod.default.string(),
  name: import_zod.default.string(),
  price: import_zod.default.number(),
  stocks: import_zod.default.number(),
  productDescription: import_zod.default.string()
});

// src/utils/trpc.ts
var import_server = require("@trpc/server");
var createContext = ({ req, res }) => {
  const auth = req.auth;
  console.log(auth);
  if (!auth.userId) {
    throw new Error("Not authenticated");
  }
  return {
    auth
  };
};
var t = import_server.initTRPC.context().create();
var router = t.router;
var publicProcedure = t.procedure;

// src/procedures/products.procedures.ts
var getAll = publicProcedure.query(async ({ input }) => {
  const allProducts = await db.query.products.findMany();
  return allProducts;
});
var create = publicProcedure.input(createProductSchema).mutation(async ({ input }) => {
  const newProduct = await db.insert(products).values({
    ...input
  });
  return newProduct;
});

// src/procedures/index.ts
var procedures = {
  products: {
    getAll,
    create
  }
};

// src/index.ts
var appRouter = router(procedures);
var app = (0, import_express2.default)();
app.use((0, import_cors.default)());
app.use(import_express2.default.json());
app.use((0, import_clerk_sdk_node.ClerkExpressWithAuth)());
app.use(
  "/trpc",
  (0, import_clerk_sdk_node.ClerkExpressWithAuth)({
    onError: (err) => {
      console.error(err);
    }
  }),
  (0, import_express.createExpressMiddleware)({ router: appRouter, createContext })
);
app.listen(3e3, () => {
  console.log("server is running on port 3000");
});
