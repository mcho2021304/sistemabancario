'use strict';

import { body, param } from 'express-validator';
import { checkValidators } from './check-validators.js';

// Validar creación de pago
export const validateCrearPago = [
    body('monto')
        .notEmpty()
        .withMessage('El monto del pago es obligatorio')
        .isFloat({ min: 0.01 })
        .withMessage('El monto debe ser mayor que 0'),

    body('cuentaOrigen')
        .notEmpty()
        .withMessage('La cuenta de origen es obligatoria')
        .isLength({ min: 5 })
        .withMessage('La cuenta de origen debe tener al menos 5 caracteres'),

    body('cuentaDestino')
        .notEmpty()
        .withMessage('La cuenta de destino es obligatoria')
        .isLength({ min: 5 })
        .withMessage('La cuenta de destino debe tener al menos 5 caracteres'),

    body('descripcion')
        .optional()
        .trim()
        .isLength({ max: 250 })
        .withMessage('La descripción no puede exceder 250 caracteres'),

    checkValidators
];

// Validar ID de pago (para obtener, actualizar o cambiar estado)
export const validatePagoId = [
    param('id')
        .isMongoId()
        .withMessage('ID debe ser un ObjectId válido'),
    checkValidators
];

// Validar cambio de estado
export const validateCambioEstadoPago = [
    param('id')
        .isMongoId()
        .withMessage('ID debe ser un ObjectId válido'),

    body('estado')
        .notEmpty()
        .withMessage('El estado es obligatorio')
        .isIn(['PENDIENTE', 'COMPLETADO', 'FALLIDO'])
        .withMessage('Estado no válido'),

    checkValidators
];