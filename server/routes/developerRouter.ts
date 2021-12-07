import express from "express";
import developerCtrl from "../controllers/developerCtrl";

const router = express.Router();

router
  .route("/developers")
  .get(developerCtrl.getDevelopers)
  .post(developerCtrl.createDeveloper);

router
  .route("/developers/:id")
  .get(developerCtrl.getDeveloper)
  .put(developerCtrl.updateDeveloper)
  .delete(developerCtrl.deleteDeveloper);

export default router;
