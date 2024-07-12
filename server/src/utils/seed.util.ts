import { db } from "../db";
import { categories } from "../db/tables/schema";
import { nanoid } from "./nanoid.util";

const seedCategories = async () => {
  const arr = ["Clothings", "Electronics", "Tools"];

  for (const category of arr) {
    const categoryId = nanoid();
    await db.insert(categories).values({
      id: categoryId,
      name: category,
      description: `Description of ${category}`,
    });
  }
};

const main = async () => {
  console.log("Seeding database");
  await seedCategories();
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
