import type { IProduct, ProductGender } from "@byltbasics/types";

import { eq } from "drizzle-orm";
import { injectable } from "inversify";

import type { IProductRepository } from "@/application/repositories";

import db from "@/infrastructure/databases/drizzle-supabase";
import { products } from "@/infrastructure/databases/drizzle-supabase/schemas";

@injectable()
export class ProductRepository implements IProductRepository {
  constructor() {}

  /**
   * Retrieves products filtered by gender
   * @param gender - Gender category to filter products by
   * @returns Promise resolving to an array of products matching the specified gender
   */
  async getProductsByGender(gender: ProductGender): Promise<IProduct[]> {
    return db.select().from(products).where(eq(products.gender, gender));
  }
}
