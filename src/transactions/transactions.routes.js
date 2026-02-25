import { Router } from "express";
import {
    getTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction
} from "./transactions.controller.js";

const router = Router();

// Rutas GET
router.get("/", getTransactions);

// Rutas POST
router.post('/', createTransaction);

// Rutas PUT
router.put('/:id', updateTransaction);

// Rutas DELETE
router.delete('/:id', deleteTransaction);

export default router;