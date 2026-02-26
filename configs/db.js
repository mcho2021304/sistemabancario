'use strict';

const mongoose = require('mongoose');
const { initializeAdmin } = require('../users/user.setup'); 

const MONGO_URI = 'mongodb://admin:password123@localhost:27017/sistema_bancario?authSource=admin';

const conectarDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Conexión a MongoDB establecida exitosamente.');
        
        await initializeAdmin(); 

    } catch (error) {
        console.error('Error al intentar conectar con MongoDB:', error.message);
        process.exit(1);
    }
};

conectarDB();