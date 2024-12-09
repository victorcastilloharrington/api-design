import { JwtPayload } from "jsonwebtoken";

export * from "express-serve-static-core";

declare module "express-serve-static-core" {
  interface Request {
    user: string | JwtPayload;
  }
}
