// src/index.ts
import dotenv from "dotenv";
import config from './config'

dotenv.config();

import app from "./server";

app.listen(config.port, () => {
  console.log(`[server]: Server is running asd at http://localhost:${config.port}`);
});
