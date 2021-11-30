const router = require("express").Router();
const filterCtrl = require("../controllers/filterCtrl");

router.route("/filter").get(filterCtrl.getFilter);

module.exports = router;
