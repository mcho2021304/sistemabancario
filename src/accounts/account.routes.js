'use strict'

import { Router } from "express";
import { getMyAccount } from "./account.controller.js";
import { validateJwt } from "../../middlewares/validate-jwt.js"; 

const router = Router();

// Solo usuarios logueados pueden ver su propia cuenta
router.get('/my-account', [validateJwt], getMyAccount);

export default router;