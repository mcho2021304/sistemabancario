'use strict';

import { Schema, model } from 'mongoose';

const paymentSchema = new Schema({
    amount: { 
        type: Number, 
        required: [true, 'El monto del pago es obligatorio'] 
    },
    senderAccount: { 
        type: String, 
        required: [true, 'La cuenta de origen es obligatoria'] 
    },
    receiverAccount: { 
        type: String, 
        required: [true, 'La cuenta de destino es obligatoria'] 
    },
    description: { 
        type: String 
    },
    status: { 
        type: String, 
        enum: ['PENDING', 'COMPLETED', 'FAILED'], 
        default: 'PENDING' 
    },
    isActive: { 
        type: Boolean, 
        default: true 
    }
}, {
    timestamps: true // crea createdAt y updatedAt automáticamente
});

export default model('Payment', paymentSchema);