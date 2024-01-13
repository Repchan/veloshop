const express = require('express');
const userController = require('../controllers/user-controller');
const productController = require('../controllers/product-controller');
const orderItemController = require('../controllers/orderItem-controller');
const orderController = require('../controllers/order-controller');
const cartController = require('../controllers/cart-controller');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Маршрутизация для пользователей
app.use('/users', userController);

// Маршрутизация для товаров
app.use('/products', productController);

// Маршрутизация для позиций заказа
app.use('/order-items', orderItemController);

// Маршрутизация для заказов
app.use('/orders', orderController);

// Маршрутизация для корзины
app.use('/cart', cartController);

// Swagger configuration
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'My API',
            version: '1.0.0',
        },
    },
    apis: [
        './src/controllers/user-controller.js',
        './src/controllers/product-controller.js',
        './src/controllers/order-item-controller.js',
        './src/controllers/order-controller.js',
        './src/controllers/cart-controller.js',
    ],
};

const swaggerSpec = swaggerJSDoc(options);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
