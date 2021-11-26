const router = require("express").Router();
const developerCtrl = require("../controllers/developerCtrl");

router
  .route("/developers")
  .get(developerCtrl.getDevelopers)
  .post(developerCtrl.createDeveloper);

router
  .route("/developers/:id")
  .get(developerCtrl.getDeveloper)
  .put(developerCtrl.updateDeveloper)
  .delete(developerCtrl.deleteDeveloper);

module.exports = router;
