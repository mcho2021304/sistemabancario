'use strict';

import mongoose from 'mongoose';

export const dbConnection = async () => {
    try {
        mongoose.connection.on('error', (error) => {
            console.log('MongoDB | error de conexión:', error.message);
            mongoose.disconnect();
        });

        mongoose.connection.on('connecting', () => {
            console.log('MongoDB | intentando conectar...');
        });

        mongoose.connection.on('connected', () => {
            console.log('MongoDB | conexión establecida');
        });

        mongoose.connection.on('open', () => {
            console.log('MongoDB | base de datos BancoKinalitos lista');
        });

        mongoose.connection.on('reconnected', () => {
            console.log('MongoDB | reconectado');
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB | desconectado');
        });

        await mongoose.connect(process.env.URL_MONGODB, {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 20
        });

    } catch (error) {
        console.log('Error al conectar la base de datos:', error.message);
        process.exit(1);
    }
};

const gracefulShutdown = async (signal) => {
    console.log(`MongoDB | cerrando conexión por ${signal}`);

    try {
        await mongoose.connection.close();
        console.log('MongoDB | conexión cerrada correctamente');
        process.exit(0);
    } catch (error) {
        console.log('MongoDB | error al cerrar conexión:', error.message);
        process.exit(1);
    }
};

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGUSR2', () => gracefulShutdown('SIGUSR2'));