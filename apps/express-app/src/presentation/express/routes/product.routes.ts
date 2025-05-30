import type { Request, Response } from "express";

import { Router } from "express";
import httpStatus from "http-status";

import { expressAdapter } from "@/presentation/adapters/express";
import { apiResponseSanitizer, getProductsByGenderController } from "@/presentation/service-provider";

/**
 * Router for product-related endpoints.
 * This router handles requests related to products, such as retrieving products
 */
const productRoutes = Router();

/**
 * Endpoint to retrieve products by gender.
 */
productRoutes.get("/gender/:gender", async (request: Request, response: Response) => {
  const products = await expressAdapter(request, getProductsByGenderController);

  response.status(httpStatus.OK).json(apiResponseSanitizer.successResponse({ data: products, message: "Products retrieved successfully" }));
});

export { productRoutes };
