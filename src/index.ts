// src/index.ts
import app from './server';

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`[server]: Server is running asd at http://localhost:${port}`);
});