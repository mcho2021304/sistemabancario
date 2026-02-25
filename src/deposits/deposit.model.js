`use strict`;

import mongoose from 'mongoose';

const depositSchema = new mongoose.Schema({
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: [true, 'La cuenta de destino es obligatoria']
    },
    amount: {
        type: Number,
        required: [true, 'El monto del depósito es obligatorio'],
        min: [1, 'El depósito mínimo debe ser de 1']
    },
    description: {
        type: String,
        trim: true,
        maxLength: [200, 'La descripción no puede exceder los 200 caracteres'],
        default: 'Depósito en efectivo'
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

// Índices para reportes rápidos por cuenta y fecha
depositSchema.index({ account: 1, date: -1 });

export default mongoose.model('Deposit', depositSchema);