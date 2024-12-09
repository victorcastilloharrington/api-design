// src/server.ts
import express, { Express, Request, Response } from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";
import { protect } from "./modules/auth";
import { createNewUser, signIn } from "./handlers/user";

const app: Express = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", protect, router);

app.post('/user', createNewUser)
app.post('/signin', signIn)

export default app;
