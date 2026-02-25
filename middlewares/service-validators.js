'use strict';

import { body, param } from 'express-validator';
import { checkValidators } from './check-validators.js';

// Crear servicio bancario
export const validateCreateService = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('El nombre del servicio es requerido')
        .isLength({ min: 2, max: 100 })
        .withMessage('El nombre debe tener entre 2 y 100 caracteres'),

    body('description')
        .optional()
        .trim()
        .isLength({ max: 250 })
        .withMessage('La descripción no puede exceder 250 caracteres'),

    body('price')
        .notEmpty()
        .withMessage('El precio del servicio es requerido')
        .isFloat({ min: 0 })
        .withMessage('El precio debe ser mayor o igual a 0'),

    body('currency')
        .notEmpty()
        .withMessage('La divisa es requerida')
        .isIn(['GTQ', 'USD'])
        .withMessage('Divisa no válida'),

    checkValidators
];

// Actualizar servicio
export const validateUpdateService = [
    param('id')
        .isMongoId()
        .withMessage('ID debe ser un ObjectId válido'),

    body('name')
        .optional()
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('El nombre debe tener entre 2 y 100 caracteres'),

    body('description')
        .optional()
        .trim()
        .isLength({ max: 250 })
        .withMessage('La descripción no puede exceder 250 caracteres'),

    body('price')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('El precio debe ser mayor o igual a 0'),

    body('currency')
        .optional()
        .isIn(['GTQ', 'USD'])
        .withMessage('Divisa no válida'),

    checkValidators
];

// Activar / desactivar servicio
export const validateServiceStatusChange = [
    param('id')
        .isMongoId()
        .withMessage('ID debe ser un ObjectId válido'),
    checkValidators
];

// Obtener servicio por ID
export const validateGetServiceById = [
    param('id')
        .isMongoId()
        .withMessage('ID debe ser un ObjectId válido'),
    checkValidators
];