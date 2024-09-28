import express, { Request, Response } from "express";
import cors from "cors";

const PORT = 3000;
const app = express();

app.use(cors({ origin: "*" }));

app.get("/", (req: Request, res: Response) => {
  try {
    res.json({
      message: "ok",
    });
  } catch (error: any) {
    console.log(error);
    res.json({
      ...error,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server Started on PORT : ${PORT}`);
});
