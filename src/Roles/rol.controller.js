import Role from './role.model.js';

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