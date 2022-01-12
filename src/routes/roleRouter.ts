import express from "express";

import rolesCtrl from "../controllers/rolesCtrl";
import authRole from "../middlewares/auth";


const router = express.Router();

router.post("/role", authRole("createRole"), rolesCtrl.createRole);
router.delete("/role/:id", authRole("deleteRole"), rolesCtrl.deleteRole);

export default router;
