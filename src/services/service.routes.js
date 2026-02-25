'use strict';

import { Router } from 'express';
import {
    createServicePayment,
    getServicePayments,
    cancelServicePayment
} from './service.controller.js';

const router = Router();

router.post('/', createServicePayment);
router.get('/', getServicePayments);
router.put('/:id/cancel', cancelServicePayment);

export default router;