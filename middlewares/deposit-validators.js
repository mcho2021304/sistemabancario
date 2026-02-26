'use strict';

import { body, param } from 'express-validator';
import { checkValidators } from './check-validators.js';

// Validate deposit creation
export const validateCreateDeposit = [
    body('amount')
        .notEmpty()
        .withMessage('Deposit amount is required')
        .isFloat({ min: 0.01 })
        .withMessage('Deposit amount must be greater than 0'),

    body('accountNumber')
        .notEmpty()
        .withMessage('Account number is required')
        .isLength({ min: 5 })
        .withMessage('Account number must have at least 5 characters'),

    body('description')
        .optional()
        .trim()
        .isLength({ max: 250 })
        .withMessage('Description cannot exceed 250 characters'),

    checkValidators
];

// Validate deposit by ID (for status update or fetch)
export const validateDepositId = [
    param('id')
        .isMongoId()
        .withMessage('ID must be a valid ObjectId'),
    checkValidators
];

// Validate status update
export const validateDepositStatusChange = [
    param('id')
        .isMongoId()
        .withMessage('ID must be a valid ObjectId'),

    body('status')
        .notEmpty()
        .withMessage('Status is required')
        .isIn(['PENDING', 'COMPLETED', 'FAILED'])
        .withMessage('Invalid status'),

    checkValidators
];