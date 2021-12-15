import express from "express";
import developerRouter from "./developerRouter";
import apartmentRouter from "./apartmentRouter";
import filterRouter from "./filterRouter";
import leadRouter from "./leadRouter";
import projectRouter from "./projectRouter";

const router = express.Router();

router.use("/", developerRouter);
router.use("/", apartmentRouter);
router.use("/", filterRouter);
router.use("/", leadRouter);
router.use("/", projectRouter);

export default router;
