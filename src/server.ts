// src/server.ts
import express, { Express, NextFunction, Request, Response } from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";
import { protect } from "./modules/auth";
import { createNewUser, signIn } from "./handlers/user";
import { ApiError } from "types";

const app: Express = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", protect, router);

app.post('/user', createNewUser)
app.post('/signin', signIn)

app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    if (err.type === "auth") {
        res.status(401).json({ message: 'unauthorized' })
    } else if (err.type === "input") {
        res.status(400).json({ message: 'invalid input' })
    } else {
        res.status(500).json({ message: "oops that's on us" })
    }
})

export default app;
