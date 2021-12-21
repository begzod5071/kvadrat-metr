import express, { Request, Response } from "express";
import filterCtrl from "../controllers/filterCtrl";

const router = express.Router();

router.route("/filter").get(filterCtrl.getFilter);

export default router;
