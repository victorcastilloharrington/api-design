// src/server.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import router from "./router";

dotenv.config();

const app: Express = express();

app.use('/api', router)

export default app