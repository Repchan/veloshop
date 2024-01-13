const express = require('express');
const OrderService = require('../services/order-service'); // Импорт OrderService
const router = express.Router();
const orderService = new OrderService(); // Создание экземпляра OrderService

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: API для управления заказами
 */

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Создание нового заказа
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               CustomerID:
 *                 type: integer
 *                 description: Идентификатор заказчика (покупателя)
 *               OrderDate:
 *                 type: string
 *                 format: date
 *                 description: Дата заказа
 *               TotalAmount:
 *                 type: number
 *                 description: Общая сумма заказа
 *               StoreID:
 *                 type: integer
 *                 description: Идентификатор магазина
 *     responses:
 *       200:
 *         description: Заказ успешно создан
 */

router.post('/', async (req, res) => {
    try {
        const result = await orderService.createOrder(req.body.OrderID ,req.body.CustomerID, req.body.OrderDate, req.body.TotalAmount, req.body.StoreID ,req.body.OrderStatus);
        res.json(result);
    } catch (error) {
        console.error('Ошибка запроса:', error);
        res.status(500).send('Ошибка сервера');
    }
});

/**
 * @swagger
 * /orders/{orderId}:
 *   get:
 *     summary: Получение заказа по идентификатору
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Идентификатор заказа
 *     responses:
 *       200:
 *         description: Успешный запрос. Возвращает информацию о заказе.
 */

router.get('/:orderId', async (req, res) => {
    try {
        const order = await orderService.getOrderById(req.params.orderId);
        res.json(order);
    } catch (error) {
        console.error('Ошибка запроса:', error);
        res.status(500).send('Ошибка сервера');
    }
});
/**
 * @swagger
 * /orders/customer/{customerId}:
 *   get:
 *     summary: Получение заказа по идентификатору пользователя
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Идентификатор пользователя
 *     responses:
 *       200:
 *         description: Успешный запрос. Возвращает информацию о заказе.
 */
router.get('/customer/:customerId', async (req, res) => {
    try {
        const order = await orderService.getOrderByCustomerId(req.params.customerId);
        res.json(order);
    } catch (error) {
        console.error('Ошибка запроса:', error);
        res.status(500).send('Ошибка сервера');
    }
});

// Другие методы по необходимости...

module.exports = router;
