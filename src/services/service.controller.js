'use strict';

import ServicePayment from './service.model.js';
import User from '../users/user.model.js';

// Crear pago de servicio
export const createServicePayment = async (req, res) => {
    try {
        const { userId, serviceName, amount } = req.body;

        const user = await User.findById(userId);

        if (!user || !user.isActive) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no válido'
            });
        }

        if (user.balance < amount) {
            return res.status(400).json({
                success: false,
                message: 'Saldo insuficiente'
            });
        }

        // Descontar saldo
        user.balance -= amount;
        await user.save();

        const payment = new ServicePayment({
            user: user._id,
            accountNumber: user.accountNumber,
            serviceName,
            amount
        });

        await payment.save();

        res.status(201).json({
            success: true,
            message: 'Pago realizado correctamente',
            data: payment
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al pagar el servicio',
            error: error.message
        });
    }
};

// Obtener pagos
export const getServicePayments = async (req, res) => {
    try {
        const payments = await ServicePayment.find()
            .populate('user', 'name accountNumber');

        res.status(200).json({
            success: true,
            data: payments
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener pagos',
            error: error.message
        });
    }
};

// Cancelar pago
export const cancelServicePayment = async (req, res) => {
    try {
        const { id } = req.params;

        const payment = await ServicePayment.findById(id);

        if (!payment) {
            return res.status(404).json({
                success: false,
                message: 'Pago no encontrado'
            });
        }

        if (payment.status === 'CANCELADO') {
            return res.status(400).json({
                success: false,
                message: 'El pago ya está cancelado'
            });
        }

        const user = await User.findById(payment.user);

        // devolver dinero
        user.balance += payment.amount;
        await user.save();

        payment.status = 'CANCELADO';
        await payment.save();

        res.status(200).json({
            success: true,
            message: 'Pago cancelado correctamente',
            data: payment
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al cancelar el pago',
            error: error.message
        });
    }
};