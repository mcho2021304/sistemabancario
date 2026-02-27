# SistemaBancario

Endpoints Principales

| Método | Ruta | Descripción |
| :--- | :--- | :--- |
| **POST** | `/bank/v1/auth/login` | Iniciar sesión y obtener Token |
| **POST** | `/bank/v1/deposits` | Realizar un depósito (Suma al balance) |
| **POST** | `/bank/v1/transfers` | Transferencia entre cuentas (Valida saldo) |
| **GET** | `/bank/v1/transfers/history/:uid` | Ver historial de un usuario específico |
