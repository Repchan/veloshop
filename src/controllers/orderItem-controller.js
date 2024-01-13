const express = require('express');
const OrderItemService = require('../services/orderItem-service');

const router = express.Router();
const orderItemService = new OrderItemService();

/**
 * @swagger
 * tags:
 *   name: OrderItems
 *   description: API для управления позициями заказа
 */

/**
 * @swagger
 * /order-items/{orderId}:
 *   get:
 *     summary: Получение позиций заказа по идентификатору заказа
 *     tags: [OrderItems]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Идентификатор заказа
 *     responses:
 *       200:
 *         description: Успешный запрос. Возвращает список позиций заказа.
 */

router.get('/:orderId', async (req, res) => {
    try {
        const orderItems = await orderItemService.getOrderItemsByOrder(req.params.orderId);
        res.json(orderItems);
    } catch (error) {
        console.error('Ошибка запроса:', error);
        res.status(500).send('Ошибка сервера');
    }
});

/**
 * @swagger
 * /order-items/user/{userId}:
 *   get:
 *     summary: Получение позиций заказа по идентификатору пользователя
 *     tags: [OrderItems]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Идентификатор пользователя (покупателя)
 *     responses:
 *       200:
 *         description: Успешный запрос. Возвращает список позиций заказа для пользователя.
 */

router.get('/user/:userId', async (req, res) => {
    try {
        const orderItems = await orderItemService.getOrderItemsByUser(req.params.userId);
        res.json(orderItems);
    } catch (error) {
        console.error('Ошибка запроса:', error);
        res.status(500).send('Ошибка сервера');
    }
});

/**
 * @swagger
 * /order-items:
 *   post:
 *     summary: Добавление новой позиции заказа
 *     tags: [OrderItems]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               OrderID:
 *                 type: integer
 *                 description: Идентификатор заказа
 *               ProductID:
 *                 type: integer
 *                 description: Идентификатор товара
 *               Quantity:
 *                 type: integer
 *                 description: Количество товара
 *               Subtotal:
 *                 type: number
 *                 description: Подытог (цена * количество)
 *     responses:
 *       200:
 *         description: Позиция заказа успешно добавлена
 */

router.post('/', async (req, res) => {
    try {
        const result = await orderItemService.addOrderItem(req.body.OrderID, req.body.ProductID, req.body.Quantity, req.body.Subtotal);
        res.json(result);
    } catch (error) {
        console.error('Ошибка запроса:', error);
        res.status(500).send('Ошибка сервера');
    }
});

// Другие методы по необходимости...

module.exports = router;
