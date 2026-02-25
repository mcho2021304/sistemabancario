'use strict';

import Payment from './payment.model.js';

// Crear un pago
export const createPayment = async (req, res) => {
    try {
        const { amount, senderAccount, receiverAccount, description } = req.body;

        const payment = new Payment({ amount, senderAccount, receiverAccount, description });
        await payment.save();

        res.status(201).json({
            success: true,
            message: 'Pago creado exitosamente',
            payment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al crear el pago',
            error: error.message
        });
    }
};

// Obtener todos los pagos activos
export const getPayments = async (req, res) => {
    try {
        const payments = await Payment.find({ isActive: true });

        res.status(200).json({
            success: true,
            payments
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener los pagos',
            error: error.message
        });
    }
};

// Obtener pagos por estado
export const getPaymentsByStatus = async (req, res) => {
    try {
        const { status } = req.params;
        const payments = await Payment.find({ status, isActive: true });

        res.status(200).json({
            success: true,
            payments
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener los pagos por estado',
            error: error.message
        });
    }
};