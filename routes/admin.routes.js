import { Router } from "express";

import * as admin from "../controllers/admin.js";

const router = Router();

router.post("/", admin.verify);

export default router;