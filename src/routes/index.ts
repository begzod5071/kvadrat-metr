import express from "express";
import developerRouter from "./developerRouter";
import apartmentRouter from "./apartmentRouter";
import filterRouter from "./filterRouter";
import leadRouter from "./leadRouter";
import projectRouter from "./projectRouter";
import auth from "../middlewares/auth";

const router = express.Router();

router.use("/", auth, developerRouter);
router.use("/", auth, projectRouter);
router.use("/", auth, apartmentRouter);
router.use("/", auth, leadRouter);
router.use("/", auth, filterRouter);

export default router;
