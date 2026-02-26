'use strict'

import User from '../users/user.model.js'

// Ver saldo y número de cuenta del usuario 
export const getMyAccount = async (req, res) => {
    try {
 // Obtenemos el ID del usuario desde el token JWT
        const userId = req.user.id 
        const user = await User.findById(userId).select('name surname accountNumber balance')

        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' })

        res.status(200).json({
            success: true,
            account: user
        })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener la cuenta', error })
    }
}