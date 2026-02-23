const mongoose = require('mongoose');
const MONGO_URI = 'mongodb://admin:password123@localhost:27017/sistema_bancario?authSource=admin';

const conectarDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Conexión a MongoDB establecida exitosamente.');
    } catch (error) {
        console.error('Error al intentar conectar con MongoDB:', error.message);
        process.exit(1);
    }
};

conectarDB();

// Levanta el contenedor de la base de datos ejecutando: docker-compose up -d
// Verificar que el contenedor esté corriendo con: docker ps
// Ejecutar script de prueba con: node index.js