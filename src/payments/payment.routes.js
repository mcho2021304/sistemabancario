'use strict';

import { Router } from 'express';
import { createPayment, getPayments, getPaymentsByStatus } from './payment.controller.js';

const router = Router();

// Rutas para Pagos
router.post('/', createPayment);          // Crear un pago
router.get('/', getPayments);            // Obtener todos los pagos activos
router.get('/status/:status', getPaymentsByStatus); // Obtener pagos por estado

export default router;