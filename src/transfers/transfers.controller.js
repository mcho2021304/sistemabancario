import Transfer from "./transfers.model.js";

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

// CREATE
export const createTransfer = async (req, res) => {
    try {
        const transfer = new Transfer(req.body);
        await transfer.save();
        res.status(201).json({
            success: true,
            message: 'Transferencia realizada',
            data: transfer
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al transferir',
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