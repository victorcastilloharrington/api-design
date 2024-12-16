import { JwtPayload } from "jsonwebtoken";

export * from "express-serve-static-core";

declare module "express-serve-static-core" {
  interface Request {
    user: JwtPayload;
  }
}

export interface ApiError extends Error {
  type: string;
}