const mysql = require('mysql2');

class CartService {
    constructor() {
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '16102002',
            database: 'veloshop',
        });

        this.connection.connect((err) => {
            if (err) {
                console.error('Ошибка подключения к базе данных:', err);
                throw err;
            }
            console.log('Подключено к базе данных');
        });
    }

    addToCart(customerId, productId, quantity) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO Cart (CustomerID, ProductID, Quantity) VALUES (?, ?, ?)';
            this.connection.query(query, [customerId, productId, quantity], (error, results, fields) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve({ success: true, message: 'Товар успешно добавлен в корзину' });
            });
        });
    }

    removeFromCart(cartId) {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM Cart WHERE CartID=?';
            this.connection.query(query, [cartId], (error, results, fields) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve({ success: true, message: 'Товар успешно удален из корзины' });
            });
        });
    }

    getCartItemsByCustomer(customerId) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Cart WHERE CustomerID=?';
            this.connection.query(query, [customerId], (error, results, fields) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results);
            });
        });
    }

    // Другие методы по необходимости...
}

module.exports = CartService;