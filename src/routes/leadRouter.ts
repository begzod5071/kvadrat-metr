import express from "express";
import leadCtrl from "../controllers/leadCtrl";

const router = express.Router();

router.route("/leads").get(leadCtrl.getLeads).post(leadCtrl.createLead);

router.route("/leads/:id").put(leadCtrl.updateLead).delete(leadCtrl.deleteLead);

export default router;
