import type { IProduct, ProductGender } from "@byltbasics/types";

import { inject, injectable } from "inversify";

import type { IProductRepository } from "@/application/repositories";

import { TYPES } from "@/infrastructure/di-container/types";

/**
 * Interface for use case to retrieve products by gender
 *
 * @interface IGetProductsByGenderUseCase
 */
export interface IGetProductsByGenderUseCase {
  /**
   * Executes the use case to retrieve products of a specific gender
   *
   * @param {ProductGender} gender - The gender to filter products by
   * @returns {Promise<IProduct[]>} A promise that resolves to an array of products matching the gender
   */
  execute: (gender: ProductGender) => Promise<IProduct[]>;
}

/**
 * Use case for retrieving products filtered by gender.
 * This class implements the IGetProductsByGenderUseCase interface.
 */
@injectable()
export class GetProductsByGenderUseCase implements IGetProductsByGenderUseCase {
  /**
   * Creates an instance of GetProductsByGenderUseCase.
   * @param productRepository - The repository for product operations.
   */
  constructor(@inject(TYPES.ProductRepository) private productRepository: IProductRepository) {}

  /**
   * Executes the use case to retrieve products by gender.
   * @param gender - The gender to filter products by.
   * @returns A promise that resolves to an array of products matching the gender.
   */
  async execute(gender: ProductGender): Promise<IProduct[]> {
    return this.productRepository.getProductsByGender(gender);
  }
}
