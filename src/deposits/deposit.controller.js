import Deposit from "./deposit.model.js";
import User from "../users/user.model.js";

// READ
export const getDeposits = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const deposits = await Deposit
            .find()
            .limit(parseInt(limit))
            .skip(skip)
            .sort({ createdAt: -1 })
            .populate('account', 'accountNumber holderName');
        const total = await Deposit.countDocuments();

        res.status(200).json({
            success: true,
            data: deposits,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalRecords: total
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al obtener depósitos",
            error: error.message
        });
    }
};

// CREATE
export const createDeposit = async (req, res) => {
    try {
        const { account, amount } = req.body;

        // Guardar el registro del depósito
        const deposit = new Deposit(req.body);
        await deposit.save();

        // BUSCAR AL USUARIO Y SUMAR EL SALDO
        const updatedUser = await User.findByIdAndUpdate(
            account, 
            { $inc: { balance: amount } }, 
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: 'No se pudo actualizar el saldo: Usuario no encontrado'
            });
        }

        res.status(201).json({
            success: true,
            message: 'Depósito creado y saldo actualizado',
            data: deposit,
            newBalance: updatedUser.balance 
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al crear depósito',
            error: error.message
        });
    }
};

// UPDATE
export const updateDeposit = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedDeposit = await Deposit.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({
            success: true,
            message: 'Depósito actualizado',
            data: updatedDeposit
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar',
            error: error.message
        });
    }
};

// DELETE
export const deleteDeposit = async (req, res) => {
    try {
        const { id } = req.params;
        await Deposit.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: 'Depósito eliminado correctamente'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar',
            error: error.message
        });
    }
};