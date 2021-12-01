import express, { Request, Response } from "express";
import developerRouter from "./developerRouter";

const router = express.Router();

router.use("/", developerRouter);

router.get("*", (req: Request, res: Response) => {
  res.json({ message: "Not found" });
});

export default router;
