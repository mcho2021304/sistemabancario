`use strict`;

import mongoose from 'mongoose';

const transferSchema = new mongoose.Schema({
    senderAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'La cuenta de origen es obligatoria']
    },
    receiverAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'La cuenta de destino es obligatoria']
    },
    amount: {
        type: Number,
        required: [true, 'El monto de la transferencia es obligatorio'],
        min: [1, 'El monto mínimo a transferir es 1']
    },
    concept: {
        type: String,
        trim: true,
        maxLength: [150, 'El concepto no puede exceder los 150 caracteres']
    },
    status: {
        type: String,
        enum: {
            values: ['COMPLETED', 'PENDING', 'REJECTED'],
            message: 'Estado de transferencia no válido'
        },
        default: 'COMPLETED'
    }
}, { timestamps: true });

// Índices para historial de envíos y recepciones
transferSchema.index({ senderAccount: 1 });
transferSchema.index({ receiverAccount: 1 });

export default mongoose.model('Transfer', transferSchema);