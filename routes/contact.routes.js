import { Router } from "express";

import * as contact from "../controllers/contact.js";

const router = Router();

router.post("/", contact.createContact);

export default router;