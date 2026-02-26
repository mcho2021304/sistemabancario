'use strict'

import { body } from 'express-validator'
import { checkValidators } from './check-validators.js'

// Validate currency conversion request
export const validateCurrencyConversion = [
    body('targetCurrency')
        .notEmpty()
        .withMessage('Target currency is required')
        .isIn(['USD', 'EUR', 'MXN'])
        .withMessage('Unsupported currency'),

    checkValidators
]