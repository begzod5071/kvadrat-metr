import express from "express";
import projectCtrl from "../controllers/projectCtrl";
import authRole from "../middlewares/auth";

const router = express.Router();

router
  .route("/project")
  .get(authRole("viewNotActive"), projectCtrl.getProjects)
  .post(authRole("createProject"), projectCtrl.createProject);

router
  .route("/project/:id")
  .put(authRole("updateProject"), projectCtrl.updateProject)
  .delete(authRole("deleteProject"), projectCtrl.deleteProject);

export default router;
