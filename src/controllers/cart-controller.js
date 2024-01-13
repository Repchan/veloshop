const express = require('express');
const CartService = require('../services/cart-service');

const router = express.Router();
const cartService = new CartService();

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: API для управления корзиной
 */

/**
 * @swagger
 * /cart:
 *   post:
 *     summary: Добавление товара в корзину
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               CustomerID:
 *                 type: integer
 *                 description: Идентификатор пользователя (покупателя)
 *               ProductID:
 *                 type: integer
 *                 description: Идентификатор товара
 *               Quantity:
 *                 type: integer
 *                 description: Количество товара
 *     responses:
 *       200:
 *         description: Товар успешно добавлен в корзину
 */

router.post('/', async (req, res) => {
    try {
        const result = await cartService.addToCart(req.body.CustomerID, req.body.ProductID, req.body.Quantity);
        res.json(result);
    } catch (error) {
        console.error('Ошибка запроса:', error);
        res.status(500).send('Ошибка сервера');
    }
});

/**
 * @swagger
 * /cart/{id}:
 *   delete:
 *     summary: Удаление товара из корзины
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Идентификатор корзины (CartItemID)
 *     responses:
 *       200:
 *         description: Товар успешно удален из корзины
 */

router.delete('/:id', async (req, res) => {
    try {
        const result = await cartService.removeFromCart(req.params.id);
        res.json(result);
    } catch (error) {
        console.error('Ошибка запроса:', error);
        res.status(500).send('Ошибка сервера');
    }
});

/**
 * @swagger
 * /cart/customer/{customerId}:
 *   get:
 *     summary: Получение товаров в корзине для конкретного пользователя
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Идентификатор пользователя (покупателя)
 *     responses:
 *       200:
 *         description: Успешный запрос. Возвращает список товаров в корзине.
 */

router.get('/customer/:customerId', async (req, res) => {
    try {
        const cartItems = await cartService.getCartItemsByCustomer(req.params.customerId);
        res.json(cartItems);
    } catch (error) {
        console.error('Ошибка запроса:', error);
        res.status(500).send('Ошибка сервера');
    }
});

module.exports = router;
