`use strict`;

import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: {
            values: ['DEPOSIT', 'TRANSFER_IN', 'TRANSFER_OUT', 'WITHDRAWAL'],
            message: 'Tipo de transacción no reconocido'
        }
    },
    amount: {
        type: Number,
        required: true
    },
    balanceAfter: {
        type: Number,
        required: [true, 'El saldo resultante es obligatorio para auditoría']
    },
    referenceId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        comment: 'ID del depósito o transferencia original'
    },
    description: {
        type: String,
        trim: true
    }
}, { timestamps: true });

// Índice para búsqueda cronológica por cuenta
transactionSchema.index({ account: 1, createdAt: -1 });

export default mongoose.model('Transaction', transactionSchema);