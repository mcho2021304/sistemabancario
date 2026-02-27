'use strict';

import { Router } from "express";
import { login, createClient, getClients, updateClient } from "./user.controller.js";

const router = Router();

router.post('/login', login); 
router.post('/', createClient);          
router.get('/', getClients);
router.put('/update/:id', updateClient);

export default router;