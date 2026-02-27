import { Router } from "express";
import {
    getTransfers,
    createTransfer,
    updateTransfer,
    deleteTransfer,
    getTransfersByUser 
} from "./transfers.controller.js";

import {
    validateCreateTransfer,
    validateTransferId,
    validateTransferUpdate
} from "../../middlewares/transfer-validators.js";

import { validateJwt } from "../../middlewares/validate-jwt.js"; 

const router = Router();

// GET
router.get("/", getTransfers);
router.get('/history/:uid', [validateJwt], getTransfersByUser);

// POST
router.post("/", validateCreateTransfer, createTransfer);

// PUT
router.put("/:id", validateTransferUpdate, updateTransfer);

// DELETE
router.delete("/:id", validateTransferId, deleteTransfer);

export default router;