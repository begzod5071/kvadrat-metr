const router = require("express").Router();
const projectCtrl = require("../controllers/projectCtrl");

router.route("/projects").get(projectCtrl.getProjects).post(projectCtrl.createProject);

module.exports = router;
