'use strict';

import { Router } from "express";
import { getRoles } from "./role.controller.js";

const router = Router();

// Rutas GET
router.get(
    '/', 
    getRoles
);

export default router;