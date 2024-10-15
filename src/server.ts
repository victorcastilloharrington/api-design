// src/server.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import router from "./router";
import morgan from "morgan";

dotenv.config();

const app: Express = express();

app.use(morgan('dev'));
app.use("/api", router);

export default app;
