import { body, param } from "express-validator";
import { checkValidators } from './check-validators.js';
import mongoose from "mongoose";

// Validar ObjectId
const isValidObjectId = (value) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("ID no válido");
    }
    return true;
};

// CREATE
export const validateCreateTransfer = [
    body("senderAccount")
        .notEmpty().withMessage("La cuenta de origen es obligatoria")
        .custom(isValidObjectId),

    body("receiverAccount")
        .notEmpty().withMessage("La cuenta de destino es obligatoria")
        .custom(isValidObjectId),

    body("amount")
        .notEmpty().withMessage("El monto es obligatorio")
        .isNumeric().withMessage("El monto debe ser numérico")
        .custom(value => value > 0).withMessage("El monto debe ser mayor a 0"),

    body("concept")
        .optional()
        .isLength({ max: 150 }).withMessage("El concepto no puede exceder 150 caracteres"),

    body("senderAccount").custom((value, { req }) => {
        if (value === req.body.receiverAccount) {
            throw new Error("No puedes transferir a la misma cuenta");
        }
        return true;
    }),

    checkValidators
];

// UPDATE
export const validateTransferUpdate = [
    param("id").custom(isValidObjectId),

    body("amount")
        .optional()
        .isNumeric().withMessage("El monto debe ser numérico")
        .custom(value => value > 0).withMessage("El monto debe ser mayor a 0"),

    body("status")
        .optional()
        .isIn(["COMPLETED", "PENDING", "REJECTED"])
        .withMessage("Estado no válido"),

    checkValidators
];

// DELETE o GET BY ID
export const validateTransferId = [
    param("id").custom(isValidObjectId),
    checkValidators
];