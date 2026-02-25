'use strict';

import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El usuario es obligatorio']
    },
    accountNumber: {
        type: String,
        required: [true, 'El número de cuenta es obligatorio']
    },
    serviceName: {
        type: String,
        required: [true, 'El nombre del servicio es obligatorio'],
        trim: true,
        maxLength: [50, 'El nombre del servicio no puede exceder 50 caracteres']
    },
    amount: {
        type: Number,
        required: [true, 'El monto es obligatorio'],
        min: [1, 'El monto debe ser mayor a 0']
    },
    status: {
        type: String,
        enum: ['PAGADO', 'CANCELADO'],
        default: 'PAGADO'
    }
}, {
    timestamps: true
});

export default mongoose.model('ServicePayment', serviceSchema);