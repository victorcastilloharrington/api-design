import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from 'bcrypt';

export const comparePasswords = (password: string, hash: string) => bcrypt.compare(password, hash);

export const hashPassword = (password: string) => bcrypt.hash(password, 5);

export const createJWT = (user: User) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET || ""
  );
  return token;
};

export const protect = (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401);
    res.json({ message: "not authorized" });
    return;
  }

  const [_, token] = bearer.split(" ");

  if (!token) {
    res.status(401);
    res.json({ message: "not authorized" });
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.user = user;
    next();
  } catch (e) {
    res.status(401);
    res.json({ message: "not authorized" });
    return;
  }
};
