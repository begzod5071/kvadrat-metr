import express from "express";

import rolesCtrl from "../controllers/rolesCtrl";

const router = express.Router();

router.post("/role", rolesCtrl.createRole);
router.delete("/role/:id", rolesCtrl.deleteRole);

export default router;
