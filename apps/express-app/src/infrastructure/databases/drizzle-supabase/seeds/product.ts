import type db from "../";

import * as schema from "../schemas";
import products from "./data/products.json";

export async function seedProducts(db: db) {
  await Promise.all(
    products.map(async (product) => {
      await db
        .insert(schema.productsTable)
        .values(product)
        .returning();
    }),
  );
}
