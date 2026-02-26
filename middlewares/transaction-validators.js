'use strict';

import { body, param } from 'express-validator';
import { checkValidators } from './check-validators.js';

// Validate transaction creation
export const validateCreateTransaction = [
    body('account')
        .notEmpty()
        .withMessage('Account ID is required')
        .isMongoId()
        .withMessage('Account must be a valid ObjectId'),

    body('type')
        .notEmpty()
        .withMessage('Transaction type is required')
        .isIn(['DEPOSIT', 'TRANSFER_IN', 'TRANSFER_OUT', 'WITHDRAWAL'])
        .withMessage('Invalid transaction type'),

    body('amount')
        .notEmpty()
        .withMessage('Amount is required')
        .isFloat({ min: 0.01 })
        .withMessage('Amount must be greater than 0'),

    body('balanceAfter')
        .notEmpty()
        .withMessage('Resulting balance is required')
        .isFloat({ min: 0 })
        .withMessage('Balance must be a valid number'),

    body('referenceId')
        .notEmpty()
        .withMessage('Reference ID is required')
        .isMongoId()
        .withMessage('Reference ID must be a valid ObjectId'),

    body('description')
        .optional()
        .trim()
        .isLength({ max: 250 })
        .withMessage('Description cannot exceed 250 characters'),

    checkValidators
];

// Validate transaction by ID
export const validateTransactionId = [
    param('id')
        .isMongoId()
        .withMessage('ID must be a valid ObjectId'),
    checkValidators
];

// Validate transaction update
export const validateUpdateTransaction = [
    param('id')
        .isMongoId()
        .withMessage('ID must be a valid ObjectId'),

    body('type')
        .optional()
        .isIn(['DEPOSIT', 'TRANSFER_IN', 'TRANSFER_OUT', 'WITHDRAWAL'])
        .withMessage('Invalid transaction type'),

    body('amount')
        .optional()
        .isFloat({ min: 0.01 })
        .withMessage('Amount must be greater than 0'),

    body('balanceAfter')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('Balance must be a valid number'),

    body('referenceId')
        .optional()
        .isMongoId()
        .withMessage('Reference ID must be a valid ObjectId'),

    body('description')
        .optional()
        .trim()
        .isLength({ max: 250 })
        .withMessage('Description cannot exceed 250 characters'),

    checkValidators
];