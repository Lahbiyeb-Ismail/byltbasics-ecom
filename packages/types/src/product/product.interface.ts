import type { ProductGender } from "./gender.type";

/**
 * Represents a product in the system.
 *
 * This interface defines the structure for product entities with all
 * necessary properties for identification, display, and management.
 */
export interface IProduct {
  /** Unique identifier for the product */
  id: string;
  /** Name of the product */
  name: string;
  /** URL-friendly version of the product name */
  slug: string;
  /** Detailed description of the product */
  description: string;
  /** Base price of the product, stored as a string for precision */
  basePrice: string;
  /** Gender category the product belongs to */
  gender: ProductGender;
  /** Indicates if the product is marked as popular */
  isPopular: boolean;
  /** Indicates if the product is currently active in the catalog */
  isActive: boolean;
  /** ISO datetime string when the product was created */
  createdAt: string;
  /** ISO datetime string when the product was last updated */
  updatedAt: string;
}
