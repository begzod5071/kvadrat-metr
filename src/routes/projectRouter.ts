import express from "express";
import projectCtrl from "../controllers/projectCtrl";
import authRole from "../middlewares/auth";

const router = express.Router();

router
  .route("/project")
  .get(authRole("viewNotActive"), projectCtrl.getProjects)
  .post(authRole("createProject"), projectCtrl.createProject);

router
  .route("/popular")
  .get(authRole("viewNotActive"), projectCtrl.getPopularProjects);

router
  .route("/project/:id")
  .get(projectCtrl.getOneProject)
  .put(authRole("updateProject"), projectCtrl.updateProject)
  .delete(authRole("deleteProject"), projectCtrl.deleteProject);

export default router;
