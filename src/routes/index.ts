import express from "express";
import developerRouter from "./developerRouter";
import apartmentRouter from "./apartmentRouter";
import filterRouter from "./filterRouter";
import leadRouter from "./leadRouter";
import projectRouter from "./projectRouter";
import auth from "../middlewares/auth";
import userRouter from "./userRouter";

const router = express.Router();

router.use("/", developerRouter);
router.use("/", projectRouter);
router.use("/", apartmentRouter);
router.use("/", leadRouter);
router.use("/", filterRouter);
router.use("/", userRouter);

export default router;
