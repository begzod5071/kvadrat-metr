import express from "express";
import homeCtrl from "../controllers/homeCtrl";
import authRole from "../middlewares/auth";

const router = express.Router();

router
  .route("/")
  .get(authRole('viewNotActive'), homeCtrl.getUser);

export default router;