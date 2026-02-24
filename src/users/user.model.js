'use strict';

import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true
    },
    surname: {
        type: String,
        required: [true, 'El apellido es obligatorio'],
        trim: true
    },
    username: {
        type: String,
        required: [true, 'El username es obligatorio'],
        unique: true,
        lowercase: true
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    phone: {
        type: String,
        required: [true, 'El número de teléfono es obligatorio']
    },
    address: {
        type: String,
        required: [true, 'La dirección es obligatoria']
    },
    dpi: {
        type: String,
        unique: true,
        // Permite que el ADMINB no tenga DPI sin dar error de duplicado
        sparse: true, 
        minLength: [13, 'El DPI debe tener 13 dígitos'],
        maxLength: [13, 'El DPI debe tener 13 dígitos']
    },
    accountNumber: {
        type: String,
        unique: true,
        sparse: true
    },
    jobName: {
        type: String,
        trim: true
    },
    monthlyIncome: {
        type: Number,
        min: [0, 'Los ingresos no pueden ser negativos']
    },
    balance: {
        type: Number,
        default: 0
    },
    role: {
        type: String,
        enum: ['ADMIN_ROLE', 'CLIENT_ROLE'],
        default: 'CLIENT_ROLE'
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Índices para optimizar búsquedas (Criterio de Rúbrica)
userSchema.index({ accountNumber: 1 });
userSchema.index({ dpi: 1 });

export default model('User', userSchema);