import Transfer from "./transfers.model.js";
import User from "../users/user.model.js";

// READ
export const getTransfers = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const transfers = await Transfer
            .find()
            .limit(parseInt(limit))
            .skip(skip)
            .sort({ createdAt: -1 })
            .populate('senderAccount', 'accountNumber holderName')
            .populate('receiverAccount', 'accountNumber holderName');
        const total = await Transfer.countDocuments();
        res.status(200).json({
            success: true,
            data: transfers,
            pagination: { totalRecords: total }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al obtener transferencias",
            error: error.message
        });
    }
};

// Obtener transferencia de usuario especifico
export const getTransfersByUser = async (req, res) => {
    try {
        // Recibimos el ID del usuario por la URL
        const { uid } = req.params; 

        // Buscamos donde el usuario sea el que envía O el que recibe
        const transfers = await Transfer.find({
            $or: [
                { senderAccount: uid },
                { receiverAccount: uid }
            ]
        })
        // De la más reciente a la más antigua
        .sort({ createdAt: -1 }) 
        .populate('senderAccount', 'accountNumber name')
        .populate('receiverAccount', 'accountNumber name');

        res.status(200).json({
            success: true,
            count: transfers.length,
            transfers
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al obtener el historial del usuario",
            error: error.message
        });
    }
};

// CREATE
export const createTransfer = async (req, res) => {
    try {
        const { senderAccount, receiverAccount, amount } = req.body;

        // Verificar si el que envía tiene suficiente dinero
        const sender = await User.findById(senderAccount);
        if (!sender || sender.balance < amount) {
            return res.status(400).json({
                success: false,
                message: 'Saldo insuficiente o cuenta de origen no encontrada'
            });
        }

        //RESTAR dinero al que envía ($inc negativo)
        await User.findByIdAndUpdate(
            senderAccount,
            { $inc: { balance: -amount } }
        );

        // SUMAR dinero al que recibe ($inc positivo)
        await User.findByIdAndUpdate(
            receiverAccount,
            { $inc: { balance: amount } }
        );

        // Guardar el registro de la transferencia
        const transfer = new Transfer(req.body);
        await transfer.save();

        res.status(201).json({
            success: true,
            message: 'Transferencia realizada exitosamente',
            data: transfer
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al procesar la transferencia',
            error: error.message
        });
    }
};

// UPDATE
export const updateTransfer = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedTransfer = await Transfer.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({
            success: true,
            data: updatedTransfer
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al editar transferencia',
            error: error.message
        });
    }
};

// DELETE
export const deleteTransfer = async (req, res) => {
    try {
        const { id } = req.params;
        await Transfer.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: 'Transferencia eliminada'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar',
            error: error.message
        });
    }
};