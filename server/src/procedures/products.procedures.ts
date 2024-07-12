import { db } from "../db";
import { products } from "../db/tables/schema";
import { createProductSchema } from "../input-schemas/products.schema";
import { nanoid } from "../utils/nanoid.util";
import { publicProcedure } from "../utils/trpc.util";

export const getAll = publicProcedure.query(async ({ input }) => {
  const allProducts = await db.query.products.findMany();
  return allProducts;
});

export const create = publicProcedure
  .input(createProductSchema)
  .mutation(async ({ input }) => {
    const productId = nanoid();
    const newProduct = await db.insert(products).values({
      ...input,
      id: productId,
    });
    return newProduct;
  });
