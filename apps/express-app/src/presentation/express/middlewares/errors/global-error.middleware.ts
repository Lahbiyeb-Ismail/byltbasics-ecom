import type { NextFunction, Request, Response } from "express";

import httpStatus from "http-status";

import type { BaseError } from "@/infrastructure/errors";

import { envConfig } from "@/config";
import { apiResponseSanitizer, logger } from "@/presentation/service-provider";

export function globalErrorMiddleware(
  err: BaseError,
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  const statusCode = err.httpCode
    ? err.httpCode
    : httpStatus.INTERNAL_SERVER_ERROR;

  logger.error(`${err.name} - ${statusCode}: ${err.message}.`);

  if (envConfig.node_env === "development") {
    logger.debug(`Error Stack: ${err.stack}`);
  }

  const formatedErrorRes = apiResponseSanitizer.errorResponse({
    message: err.message,
    statusCode,
    name: err.name,
  });

  res.status(formatedErrorRes.statusCode).json(formatedErrorRes);

  next();
}
