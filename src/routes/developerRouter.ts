import express from "express";
import developerCtrl from "../controllers/developerCtrl";
import authRole from "../middlewares/auth";

const router = express.Router();

router
  .route("/developer")
  .get(authRole("viewDeletedData"), developerCtrl.getDevelopers)
  .post(developerCtrl.createDeveloper);

router
  .route("/developer/:id")
  .get(developerCtrl.getDeveloper)
  .put(developerCtrl.updateDeveloper)
  .delete(developerCtrl.deleteDeveloper);

export default router;
