const router = require("express").Router();
const appartment = require("../controllers/appartmentCtrl");

router
  .route("/appartments")
  .get(appartment.getAppartment)
  .post(appartment.postAppartment);

router
  .route("/appartments/:id")
  .put(appartment.updateAppartment)
  .delete(appartment.deleteAppartment);

module.exports = router;