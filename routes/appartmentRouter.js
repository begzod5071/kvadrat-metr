const router = require("express").Router();
const appartment = require("../controllers/appartmentCtrl");

router
  .route("/appartments")
  .get(appartment.getAppartments)
  .post(appartment.postAppartment);

router
  .route("/appartments/:id")
  .get(appartment.getAppartment)
  .put(appartment.updateAppartment)
  .delete(appartment.deleteAppartment);

router.route("/appartments/views").post(appartment.postView);

module.exports = router;
