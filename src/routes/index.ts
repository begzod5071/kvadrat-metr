import express from "express";
import developerRouter from "./developerRouter";
import apartmentRouter from "./apartmentRouter";
import filterRouter from "./filterRouter";
import leadRouter from "./leadRouter";
import projectRouter from "./projectRouter";
import userRouter from "./userRouter";
import roleCtrl from "./roleRouter";

const router = express.Router();

router.use("/", userRouter);
router.use("/", developerRouter);
router.use("/", projectRouter);
router.use("/", apartmentRouter);
router.use("/", leadRouter);
router.use("/", filterRouter);
router.use("/", roleCtrl);

export default router;
