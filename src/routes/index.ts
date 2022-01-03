import express from "express";
import developerRouter from "./developerRouter";
import apartmentRouter from "./apartmentRouter";
import filterRouter from "./filterRouter";
import leadRouter from "./leadRouter";
import projectRouter from "./projectRouter";
import auth from "../middlewares/auth";
import userRouter from "./userRouter";

const router = express.Router();

router.use("/", auth, developerRouter);
router.use("/", auth, projectRouter);
router.use("/", auth, apartmentRouter);
router.use("/", auth, leadRouter);
router.use("/", auth, filterRouter);
router.use("/", auth, userRouter);

export default router;
