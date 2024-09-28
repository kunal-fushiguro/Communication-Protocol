import express, { Request, Response } from "express";
import cors from "cors";
import event from "events";

const PORT = 3000;
const app = express();

app.use(cors({ origin: "*" }));

const eventEmitter = new event.EventEmitter();

app.get("/", (req: Request, res: Response) => {
  try {
    eventEmitter.once("polling", (random1, random2) => {
      res.json({
        random1: random2,
      });
    });
  } catch (error: any) {
    console.log(error);
    res.json({
      ...error,
    });
  }
});

app.get("/polling", (req: Request, res: Response) => {
  try {
    eventEmitter.emit("polling", "success", "true");
    res.json({
      message: "long polling done",
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
