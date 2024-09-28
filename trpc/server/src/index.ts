// npx tsx src/index.js

import express from "express";
import { appRouter } from "./routes/trpc";
import { createExpressMiddleware } from "@trpc/server/adapters/express";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
  })
);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// import express, { Request, Response, NextFunction } from "express";
// import router from "./routes/task";

// const app = express();
// const port = process.env.PORT || 3000;

// app.use(express.json());
// app.use("/api/tasks", router);

// app.get("/", (req: Request, res: Response) => {
//   res.send("Hello, TypeScript Express!");
// });

// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//   console.error(err.stack);
//   res.status(500).send("Something went wrong");
// });

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });
