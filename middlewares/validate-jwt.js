'use strict'

import jwt from 'jsonwebtoken'
import User from '../src/users/user.model.js'

export const validateJwt = async (req, res, next) => {
    try {
        let token = req.headers.authorization

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token requerido'
            })
        }

        token = token.replace('Bearer ', '')

        const decoded = jwt.verify(token, process.env.SECRET_KEY)

        const user = await User.findById(decoded.uid)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            })
        }

        req.user = { id: user._id }
        next()

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Token inválido'
        })
    }
}