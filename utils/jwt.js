'use strict'

import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const generateJwt = async (payload) => {
    try {
        // Genera el token usando la llave del .env y expira en 3h
        return jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: '3h',
            algorithm: 'HS256'
        })
    } catch (err) {
        console.error(err)
        return null
    }
}