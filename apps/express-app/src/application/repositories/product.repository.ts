import type { IProduct, ProductGender } from "@byltbasics/types";

/**
 * Interface representing a product repository.
 * Provides methods to interact with product data.
 */
export interface IProductRepository {
  /**
   * Retrieves products filtered by gender
   * @param gender - Gender category to filter products by
   * @returns Promise resolving to an array of products matching the specified gender
   */
  getProductsByGender: (gender: ProductGender) => Promise<IProduct[]>;
}
