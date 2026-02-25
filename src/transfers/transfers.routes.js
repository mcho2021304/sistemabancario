import { Router } from "express";
import {
    getTransfers,
    createTransfer,
    updateTransfer,
    deleteTransfer
} from "./transfers.controller.js";

const router = Router();

// Rutas GET
router.get("/", getTransfers);

// Rutas POST
router.post('/', createTransfer);

// Rutas PUT
router.put('/:id', updateTransfer);

// Rutas DELETE
router.delete('/:id', deleteTransfer);

export default router;