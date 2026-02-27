'use strict'

import jwt from 'jsonwebtoken'
import User from '../src/users/user.model.js'

export const validateJwt = async (req, res, next) => {
    try {
        let token = req.headers.authorization

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token requerido para acceder a este recurso'
            })
        }

        // Limpiamos token si viene con el prefijo 'Bearer '
        token = token.replace(/^Bearer\s+/, '')

        // Verificamos el token con la llave del .env
        const decoded = jwt.verify(token, process.env.SECRET_KEY)

        const user = await User.findById(decoded.id) 
        
        if (!user || !user.isActive) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado o cuenta desactivada'
            })
        }

        // Inyectamos el usuario completo en la petición
        req.user = user 
        next()

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Token inválido o sesión expirada'
        })
    }
}