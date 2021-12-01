import express from "express";
import developerCtrl from "../controllers/developerCtrl";

const router = express.Router();

router.route("/developer").get(developerCtrl.getDeveloper);

export default router;
