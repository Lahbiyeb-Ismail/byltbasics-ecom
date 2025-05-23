// Import reflect-metadata to enable decorators
import "reflect-metadata";

import type { IApiResponseSanitizer, ILogger } from "@/application/providers";
import type { IAuthLoginController, IAuthRegisterController } from "@/presentation/controllers/auth";

import { container } from "@/infrastructure/di-container/container";
import { TYPES } from "@/infrastructure/di-container/types";

export const logger = container.get<ILogger>(TYPES.Logger);

export const apiResponseSanitizer = container.get<IApiResponseSanitizer>(
  TYPES.ApiResponseSanitizer,
);

export const authRegisterController = container.get<IAuthRegisterController>(
  TYPES.AuthRegisterController,
);

export const authLoginController = container.get<IAuthLoginController>(
  TYPES.AuthLoginController,
);
