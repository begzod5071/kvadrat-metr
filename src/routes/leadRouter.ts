import express from "express";
import leadCtrl from "../controllers/leadCtrl";
import authRole from "../middlewares/auth";

const router = express.Router();

router
  .route("/leads")
  .get(authRole("getLeads"), leadCtrl.getLeads)
  .post(leadCtrl.createLead);

router
  .route("/leads/:id")
  .put(leadCtrl.updateLead)
  .delete(authRole("deleteLead"), leadCtrl.deleteLead);

export default router;
