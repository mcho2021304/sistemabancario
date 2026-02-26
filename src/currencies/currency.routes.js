import { Router } from "express"
import { convertMyBalance } from "./currency.controller.js"
import { validateJwt } from "../../middlewares/validate-jwt.js"
import { validateCurrencyConversion } from "../../middlewares/currencies-validators.js"

const router = Router()

router.post('/convert', [validateJwt, validateCurrencyConversion], convertMyBalance)

export default router