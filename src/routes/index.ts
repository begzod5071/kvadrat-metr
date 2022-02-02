import express from "express";
import developerRouter from "./developerRouter";
import apartmentRouter from "./apartmentRouter";
import filterRouter from "./filterRouter";
import leadRouter from "./leadRouter";
import projectRouter from "./projectRouter";
import userRouter from "./userRouter";
import homeRouter from "./homeRouter";
import roleCtrl from "./roleRouter";
import uploadRouter from "./uploadRouter";
import swaggerUI from "swagger-ui-express";
import { docs } from "../docs/index";

const router = express.Router();

router.use("/api-docs", swaggerUI.serve, swaggerUI.setup(docs));

router.use("/", userRouter);
router.use("/", homeRouter);
router.use("/", developerRouter);
router.use("/", projectRouter);
router.use("/", apartmentRouter);
router.use("/", leadRouter);
router.use("/", filterRouter);
router.use("/", roleCtrl);
router.use("/", uploadRouter);

export default router;
