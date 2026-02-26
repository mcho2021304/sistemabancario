'use strict';

// Importaciones
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

import { corsOptions } from './cors-configuration.js';
import { dbConnection } from './db.js';
import { helmetConfiguration } from './helmet-configuration.js';
import { requestLimit } from '../middlewares/request-limit.js';
import { errorHandler } from '../middlewares/handle-errors.js';

// Rutas del sistema bancario
import userRoutes from '../src/users/user.routes.js';
import roleRoutes from '../src/Roles/rol.routes.js';
import serviceRoutes from '../src/services/service.routes.js';

const BASE_URL = '/bank/v1';

// Configuración de middlewares
const middlewares = (app) => {
    app.use(helmet(helmetConfiguration));
    app.use(cors(corsOptions));
    app.use(express.urlencoded({ extended: false, limit: '10mb' }));
    app.use(express.json({ limit: '10mb' }));
    app.use(requestLimit);
    app.use(morgan('dev'));
};

// Integración de rutas
const routes = (app) => {
    app.use(`${BASE_URL}/users`, userRoutes);
    app.use(`${BASE_URL}/Roles`, roleRoutes);
    app.use(`${BASE_URL}/services`, serviceRoutes);
};

// Inicializar servidor
const initServer = async (app) => {
    app = express();
    const PORT = process.env.PORT || 3001;

    try {
        await dbConnection();
        middlewares(app);
        routes(app);
        app.use(errorHandler);

        app.listen(PORT, () => {
            console.log(`Servidor BancoKinalitos corriendo en puerto ${PORT}`);
            console.log(`Base URL: http://localhost:${PORT}${BASE_URL}`);
        });

        // Ruta de salud del sistema
        app.get(`${BASE_URL}/health`, (req, res) => {
            res.status(200).json({
                status: 'ok',
                service: 'BancoKinalitos API',
                version: '1.0.0'
            });
        });

    } catch (error) {
        console.log('Error al iniciar el servidor:', error);
    }
};

export { initServer };