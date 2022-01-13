import express from "express";
import apartment from "../controllers/apartmentCtrl";
import authRole from "../middlewares/auth";

const router = express.Router();

router
  .route("/apartment")
  .get(authRole("viewDeletedData"), apartment.getApartments)
  .post(authRole("createApartment"), apartment.createApartment);

router
  .route("/apartment/:id")
  .get(apartment.getApartment)
  .put(authRole("updateApartment"), apartment.updateApartment)
  .delete(authRole("deleteApartment"), apartment.deleteApartment);

router.route("/apartment/event").post(apartment.postView);

export default router;
