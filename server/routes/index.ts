import express, { Request, Response } from "express";
import developerRouter from "./developerRouter";

const router = express.Router();

router.use("/", developerRouter);

export default router;
