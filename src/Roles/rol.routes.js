'use strict';

import { Router } from 'express';
import { createRole, getRoles } from './rol.controller.js';

const router = Router();

// Rutas para Roles
router.post('/', createRole);  // Crear un rol
router.get('/', getRoles);     // Obtener todos los roles activos

export default router;