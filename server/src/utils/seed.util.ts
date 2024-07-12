import { db } from "../db";
import { categories } from "../db/tables/schema";
import { nanoid } from "./nanoid.util";

const seedCategories = async () => {
  const arr = ["Clothings", "Electronics", "Tools"];

  return Promise.all(
    arr.map(async (categoryName) => {
      const categoryId = nanoid();
      await db.insert(categories).values({
        id: categoryId,
        name: categoryName,
        description: `Description for ${categoryName}`,
      });
    })
  );
};

const main = async () => {
  console.log("Seeding database");
  seedCategories();
};

main()
  .then(() => {
    console.log("Finished seeding");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(0);
  });
