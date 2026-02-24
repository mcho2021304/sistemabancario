import User from './user.model.js';
import bcrypt from 'bcryptjs';

// Crear Cliente 
export const createClient = async (req, res) => {
    try {
        const data = req.body;

        // 1. Validación de Ingresos Regla de negocio: > Q100
        if (data.monthlyIncome < 100) {
            return res.status(400).json({
                success: false,
                message: 'No se puede crear la cuenta. Los ingresos mensuales deben ser mayores a Q100.'
            });
        }

        // 2. Generar Número de Cuenta Aleatorio 
        data.accountNumber = Math.floor(Math.random() * 9000000000 + 1000000000).toString();

        // 3. Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        data.password = bcrypt.hashSync(data.password, salt);

        data.role = 'CLIENT_ROLE';

        const user = new User(data);
        await user.save();

        res.status(201).json({
            success: true,
            message: 'Cliente creado exitosamente',
            accountDetails: {
                name: user.name,
                account: user.accountNumber,
                balance: user.balance
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al crear el cliente',
            error: error.message
        });
    }
};

// Obtener todos los clientes 
export const getClients = async (req, res) => {
    try {
        const { limit = 10, page = 1 } = req.query;
        const query = { role: 'CLIENT_ROLE', isActive: true };

        const [total, users] = await Promise.all([
            User.countDocuments(query),
            User.find(query)
                .skip((Number(page) - 1) * Number(limit))
                .limit(Number(limit))
        ]);

        res.status(200).json({
            success: true,
            total,
            users
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener clientes', error });
    }
};

// Actualizar Cliente 
export const updateClient = async (req, res) => {
    try {
        const { id } = req.params;
        const { dpi, password, accountNumber, role, ...data } = req.body; 

        const user = await User.findByIdAndUpdate(id, data, { new: true });

        if (!user) return res.status(404).json({ success: false, message: 'Usuario no encontrado' });

        res.status(200).json({
            success: true,
            message: 'Cliente actualizado correctamente. (DPI y Password no se pueden modificar por este medio)',
            user
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};