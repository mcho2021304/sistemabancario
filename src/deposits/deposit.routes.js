import { Router } from "express";
import {
    getDeposits,
    createDeposit,
    updateDeposit,
    deleteDeposit
} from "./deposit.controller.js";

const router = Router();

// Rutas GET
router.get("/", getDeposits);

// Rutas POST
router.post('/', createDeposit);

// Rutas PUT
router.put('/:id', updateDeposit);

// Rutas DELETE
router.delete('/:id', deleteDeposit);

export default router;