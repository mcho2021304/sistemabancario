'use strict';

import { Schema, model } from 'mongoose';

const roleSchema = new Schema({
    roleName: { 
        type: String, 
        required: [true, 'El nombre del rol es obligatorio'],
        unique: true,
        uppercase: true,
        enum: ['ADMIN_ROLE', 'CLIENT_ROLE'],
    },
    isActive: { 
        type: Boolean, 
        default: true 
    }
});

export default model('Role', roleSchema);