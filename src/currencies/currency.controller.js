'use strict'

import User from '../users/user.model.js'

export const convertMyBalance = async (req, res) => {
    try {
        const userId = req.user.id
        const { targetCurrency } = req.body 
        
        const user = await User.findById(userId)
        
        // Tipos de cambio
        const rates = {
            'USD': 0.13, // 1 Quetzal = 0.13 Dólares
            'EUR': 0.12, // 1 Quetzal = 0.12 Euros
            'MXN': 2.25  // 1 Quetzal = 2.25 Pesos MX
        }

        if (!rates[targetCurrency]) {
            return res.status(400).json({ success: false, message: 'Moneda no soportada' })
        }

        const convertedAmount = user.balance * rates[targetCurrency]

        res.status(200).json({
            success: true,
            balanceGTQ: user.balance,
            target: targetCurrency,
            converted: convertedAmount.toFixed(2)
        })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error en la conversión', error })
    }
}