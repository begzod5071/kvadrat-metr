import express from "express";
import developerRouter from "./developerRouter";
import apartmentRouter from "./apartmentRouter";
import filterRouter from "./filterRouter";
import leadRouter from "./leadRouter";
import projectRouter from "./projectRouter";
import auth from "../middlewares/auth";
import userRouter from "./userRouter";
import roleCtrl from "./roleRouter";

const router = express.Router();

router.use("/", userRouter);
router.use("/", auth, developerRouter);
router.use("/", auth, projectRouter);
router.use("/", auth, apartmentRouter);
router.use("/", auth, leadRouter);
router.use("/", auth, filterRouter);
router.use("/", auth, roleCtrl);

export default router;
