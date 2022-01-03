import express from "express";

import userCtrl from "../controllers/userCtrl";

const router = express.Router();

router.post("/login", userCtrl.login);

export default router;
