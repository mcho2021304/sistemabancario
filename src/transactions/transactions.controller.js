import Transaction from "./transactions.model.js";

// READ
export const getTransactions = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const transactions = await Transaction.find()
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit));
        const total = await Transaction.countDocuments();
        res.status(200).json({
            success: true,
            data: transactions,
            pagination: { totalRecords: total }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al obtener historial",
            error: error.message
        });
    }
};

// CREATE
export const createTransaction = async (req, res) => {
    try {
        const transaction = new Transaction(req.body);
        await transaction.save();
        res.status(201).json({
            success: true,
            data: transaction
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al crear registro',
            error: error.message
        });
    }
};

// UPDATE
export const updateTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await Transaction.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({
            success: true,
            data: updated
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar registro',
            error: error.message
        });
    }
};

// DELETE
export const deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        await Transaction.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: 'Registro de historial eliminado'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar registro',
            error: error.message
        });
    }
};