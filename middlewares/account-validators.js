'use strict'

import { param } from 'express-validator'
import { checkValidators } from './check-validators.js'

// Validar ID de cuenta por parámetro
export const validateAccountId = [
    param('id')
        .isMongoId()
        .withMessage('Account ID must be a valid ObjectId'),
    checkValidators
]