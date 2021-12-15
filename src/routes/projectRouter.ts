import express from "express";
import projectCtrl from "../controllers/projectCtrl";

const router = express.Router();

router
  .route("/project")
  .get(projectCtrl.getProjects)
  .post(projectCtrl.createProject);

router
  .route("/project/:id")
  .put(projectCtrl.updateProject)
  .delete(projectCtrl.deleteProject);

export default router;
