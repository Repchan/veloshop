// product-controller.js
const express = require('express');
const ProductService = require('../services/product-service');

const router = express.Router();
const productService = new ProductService();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API для управления товарами
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Получение всех товаров
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Успешный запрос. Возвращает список всех товаров.
 */

router.get('/', async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.json(products);
    } catch (error) {
        console.error('Ошибка запроса:', error);
        res.status(500).send('Ошибка сервера');
    }
});

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Добавление нового товара
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Name:
 *                 type: string
 *                 description: Название товара
 *               Brand:
 *                 type: string
 *                 description: Бренд товара
 *               Type:
 *                 type: string
 *                 description: Тип товара
 *               Color:
 *                 type: string
 *                 description: Цвет товара
 *               Price:
 *                 type: number
 *                 description: Цена товара
 *               QuantityInStock:
 *                 type: integer
 *                 description: Количество товара в наличии
 *               Category:
 *                 type: string
 *                 description: Категория товара
 *               StoreID:
 *                 type: integer
 *                 description: Идентификатор магазина
 *               Description:
 *                  type: string
 *                  description: Описание товара
 *               ShortDescription:
 *                  type:string
 *                  description:Короткое описание товара
 *     responses:
 *       200:
 *         description: Товар успешно добавлен
 */

router.post('/', async (req, res) => {
    try {
        const result = await productService.addProduct(req.body);
        res.json(result);
    } catch (error) {
        console.error('Ошибка запроса:', error);
        res.status(500).send('Ошибка сервера');
    }
});

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Обновление товара
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Идентификатор товара
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Name:
 *                 type: string
 *                 description: Новое название товара
 *               Brand:
 *                 type: string
 *                 description: Новый бренд товара
 *               Type:
 *                 type: string
 *                 description: Новый тип товара
 *               Color:
 *                 type: string
 *                 description: Новый цвет товара
 *               Price:
 *                 type: number
 *                 description: Новая цена товара
 *               QuantityInStock:
 *                 type: integer
 *                 description: Новое количество товара в наличии
 *               Category:
 *                 type: string
 *                 description: Новая категория товара
 *               StoreID:
 *                 type: integer
 *                 description: Новый идентификатор магазина
 *               Description:
 *                  type: string
 *                  description: Описание товара
 *               ShortDescription:
 *                  type:string
 *                  description:Короткое описание товара
 *     responses:
 *       200:
 *         description: Товар успешно обновлен
 */

router.put('/:id', async (req, res) => {
    try {
        const result = await productService.updateProduct(req.params.id, req.body);
        res.json(result);
    } catch (error) {
        console.error('Ошибка запроса:', error);
        res.status(500).send('Ошибка сервера');
    }
});

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Удаление товара
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Идентификатор товара
 *     responses:
 *       200:
 *         description: Товар успешно удален
 */

router.delete('/delete/:id', async (req, res) => {
    try {
        const result = await productService.deleteProduct(req.params.id);
        res.json(result);
    } catch (error) {
        console.error('Ошибка запроса:', error);
        res.status(500).send('Ошибка сервера');
    }
});

/**
 * @swagger
 * /products/search/name/{name}:
 *   get:
 *     summary: Поиск товаров по имени
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Название товара для поиска
 *     responses:
 *       200:
 *         description: Успешный запрос. Возвращает список товаров с указанным именем.
 */

router.get('/search/:name', async (req, res) => {
    try {
        const products = await productService.findProductsByName(req.params.name);
        res.json(products);
    } catch (error) {
        console.error('Ошибка запроса:', error);
        res.status(500).send('Ошибка сервера');
    }
});

/**
 * @swagger
 * /products/search/category/{category}:
 *   get:
 *     summary: Поиск товаров по категории
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *         description: Категория товара для поиска
 *     responses:
 *       200:
 *         description: Успешный запрос. Возвращает список товаров в указанной категории.
 */

router.get('/search/category/:category', async (req, res) => {
    try {
        const products = await productService.findProductsByCategory(req.params.category);
        res.json(products);
    } catch (error) {
        console.error('Ошибка запроса:', error);
        res.status(500).send('Ошибка сервера');
    }
});

/**
 * @swagger
 * /products/search/color/{color}:
 *   get:
 *     summary: Поиск товаров по цвету
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: color
 *         required: true
 *         schema:
 *           type: string
 *         description: Цвет товара для поиска
 *     responses:
 *       200:
 *         description: Успешный запрос. Возвращает список товаров с указанным цветом.
 */

router.get('/search/color/:color', async (req, res) => {
    try {
        const products = await productService.findProductsByColor(req.params.color);
        res.json(products);
    } catch (error) {
        console.error('Ошибка запроса:', error);
        res.status(500).send('Ошибка сервера');
    }
});

/**
 * @swagger
 * /products/search/type/{type}:
 *   get:
 *     summary: Поиск товаров по типу
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *         description: Тип товара для поиска
 *     responses:
 *       200:
 *         description: Успешный запрос. Возвращает список товаров с указанным типом.
 */

router.get('/search/type/:type', async (req, res) => {
    try {
        const products = await productService.findProductsByType(req.params.type);
        res.json(products);
    } catch (error) {
        console.error('Ошибка запроса:', error);
        res.status(500).send('Ошибка сервера');
    }
});
router.get('/search/id/:id',async (req,res)=>{
    try{
        const products = await productService.findProductById(req.params.id);
        res.json(products);
    }
    catch (error){
        console.error('Ошибка запроса:', error);
        res.status(500).send('Ошибка сервера');
    }
})

module.exports = router;
