const router = require("express").Router();
const leadCtrl = require("../controllers/leadCtrl");

router.route("/leads").get(leadCtrl.getLeads).post(leadCtrl.createLead);

router.route("/leads/:id").put(leadCtrl.updateLead).delete(leadCtrl.deleteLead);

module.exports = router;
