import { eq } from "drizzle-orm";
import { db } from "../db";
import { categories } from "../db/tables/schema";
import { createCategorySchema } from "../input-schemas/category.schema";
import { nanoid } from "../utils/nanoid.util";
import { publicProcedure } from "../utils/trpc.util";

export const getCategories = publicProcedure.query(async () => {
  const categories = await db.query.categories.findMany();
  return categories;
});

export const createCategory = publicProcedure
  .input(createCategorySchema)
  .mutation(async ({ input }) => {
    const categoryId = nanoid();
    await db.insert(categories).values({
      id: categoryId,
      name: input.name,
      description: input.description,
    });

    const newCategory = await db.query.categories.findFirst({
      where: eq(categories.id, categoryId),
    });
    return newCategory;
  });
