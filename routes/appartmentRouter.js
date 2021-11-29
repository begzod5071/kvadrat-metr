const router = require("express").Router();
const appartment = require("../controllers/appartmentCtrl");

router
  .route("/appartments")
  .get(appartment.getAppartments)
  .post(appartment.postAppartment);

router
  .route("/appartments/:id")
  .put(appartment.updateAppartment)
  .delete(appartment.deleteAppartment);
router
  .route("/views")
  .post(appartment.postView)

module.exports = router;
