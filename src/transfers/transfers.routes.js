import { Router } from "express";
import {
    getTransfers,
    createTransfer,
    updateTransfer,
    deleteTransfer
} from "./transfers.controller.js";

import {
    validateCreateTransfer,
    validateTransferId,
    validateTransferUpdate
} from "../../middlewares/transfer-validators.js";

const router = Router();

// GET
router.get("/", getTransfers);

// POST
router.post("/", validateCreateTransfer, createTransfer);

// PUT
router.put("/:id", validateTransferUpdate, updateTransfer);

// DELETE
router.delete("/:id", validateTransferId, deleteTransfer);

export default router;