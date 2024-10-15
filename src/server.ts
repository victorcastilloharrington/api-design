// src/server.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import router from "./router";
import morgan from "morgan";
import cors from "cors";

dotenv.config();

const app: Express = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

export default app;
