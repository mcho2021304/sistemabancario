'use strict';

import Role from './rol.model.js';

// Crear rol
export const createRole = async (req, res) => {
    try {
        const { roleName } = req.body;

        const role = new Role({ roleName });
        await role.save();

        res.status(201).json({
            success: true,
            message: 'Rol creado exitosamente',
            role
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al crear el rol',
            error: error.message
        });
    }
};

// Obtener roles activos
export const getRoles = async (req, res) => {
    try {
        const roles = await Role.find({ isActive: true });

        res.status(200).json({
            success: true,
            roles
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener los roles',
            error: error.message
        });
    }
};