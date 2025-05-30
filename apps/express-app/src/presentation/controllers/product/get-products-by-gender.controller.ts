import type { IProduct, ProductGender } from "@byltbasics/types";

import { inject, injectable } from "inversify";

import type { IGetProductsByGenderUseCase } from "@/application/use-cases/product";

import { TYPES } from "@/infrastructure/di-container/types";

import type { EmptyRecord, IHttpRequest } from "../../types";
import type { IHttpController } from "../controller.interface";

export interface IGetProductsByGenderController extends IHttpController<EmptyRecord, IProduct[]> {}

/**
 * Controller responsible for handling HTTP requests related to retrieving products
 * filtered by gender.
 *
 * @remarks
 * This controller receives requests to fetch products based on the specified gender
 * and delegates the business logic to the injected `GetProductByGenderUseCase`.
 */
@injectable()
export class GetProductsByGenderController implements IGetProductsByGenderController {
  /**
   * Creates an instance of the controller with the injected GetProductByGenderUseCase dependency.
   *
   * @param getProductsByGenderUseCase - The use case responsible for handling product retrieval.
   */
  constructor(@inject(TYPES.GetProductsByGenderUseCase) private getProductsByGenderUseCase: IGetProductsByGenderUseCase) {}

  /**
   * Handles the HTTP request to retrieve products by gender.
   *
   * @param request - The HTTP request containing the gender parameter.
   * @returns A promise that resolves to an array of products matching the gender.
   */
  async handle(request: IHttpRequest<EmptyRecord>): Promise<IProduct[]> {
    const gender = request.params.gender as ProductGender;

    const products = await this.getProductsByGenderUseCase.execute(gender);

    return products;
  }
}
