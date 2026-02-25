'use strict';

import { Router } from "express";
import { createClient, getClients, updateClient } from "./user.controller.js";

const router = Router();

// Rutas para el Administrador
router.post('/', createClient);          // ← cambio aquí
router.get('/', getClients);
router.put('/update/:id', updateClient);

export default router;