import User from './user.model.js';
import bcrypt from 'bcryptjs';

export const initializeAdmin = async () => {
    try {
        // Verificar si ya existe un administrador para no duplicarlo
        const adminExists = await User.findOne({ username: 'ADMINB' });

        if (adminExists) {
            console.log('Admin ya existe en la base de datos.');
            return;
        }

        // Preparar los datos del administrador por defecto
        const salt = bcrypt.genSaltSync(10);
        const adminData = {
            name: 'Administrador',
            surname: 'Principal',
            username: 'ADMINB',
            email: 'admin@banco.com',
            // Contraseña por defecto
            password: bcrypt.hashSync('ADMINB123', salt), 
            phone: '00000000',
            address: 'Ciudad de Guatemala',
            role: 'ADMIN_ROLE'
        };

        // Guardar en la base de datos
        const admin = new User(adminData);
        await admin.save();

        console.log(' Usuario ADMINB creado exitosamente por defecto.');
    } catch (error) {
        console.error(' Error al inicializar el administrador:', error);
    }
};