import express from "express";
import apartment from "../controllers/apartmentCtrl";

const router = express.Router();

router
  .route("/apartment")
  .get(apartment.getApartments)
  .post(apartment.postApartment);

router
  .route("/apartment/:id")
  .get(apartment.getApartment)
  .put(apartment.updateApartment)
  .delete(apartment.deleteApartment);

router.route("/apartment/event").post(apartment.postView);

export default router;
