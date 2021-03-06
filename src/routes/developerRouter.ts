import express from "express";
import developerCtrl from "../controllers/developerCtrl";
import authRole from "../middlewares/auth";

const router = express.Router();

router
  .route("/developer")
  .get(authRole("viewNotActive"), developerCtrl.getDevelopers)
  .post(authRole("createDeveloper"), developerCtrl.createDeveloper);

router
  .route("/developer/:id")
  .get(developerCtrl.getDeveloper)
  .put(authRole("updateDeveloper"), developerCtrl.updateDeveloper)
  .delete(authRole("deleteDeveloper"), developerCtrl.deleteDeveloper);

router
  .route("/change/developer/:id")
  .put(authRole("updateDeveloper"), developerCtrl.hideDeveloper);

export default router;
