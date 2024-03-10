const mysql = require('mysql2');

class OrderItemService {
    constructor() {
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '16102002',
            database: 'Veloshop',
        });

        this.connection.connect((err) => {
            if (err) {
                console.error('Ошибка подключения к базе данных:', err);
                throw err;
            }
            console.log('Подключено к базе данных');
        });
    }

    addOrderItem(orderId, productId, quantity, subtotal) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO OrderItem (OrderID, ProductID, Quantity, Subtotal) VALUES (?, ?, ?, ?)';
            this.connection.query(query, [orderId, productId, quantity, subtotal], (error, results, fields) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve({ success: true, message: 'Позиция заказа успешно добавлена' });
            });
        });
    }

    getOrderItemsByOrder(orderId) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM OrderItem WHERE OrderID=?';
            this.connection.query(query, [orderId], (error, results, fields) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results);
            });
        });
    }

    getOrderItemsByUser(userId) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT oi.*, p.Name AS ProductName
                FROM OrderItem oi
                JOIN \`Order\` o ON oi.OrderID = o.OrderID
                JOIN Product p ON oi.ProductID = p.ProductID
                WHERE o.CustomerID = ?;
            `;
            this.connection.query(query, [userId], (error, results, fields) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results);
            });
        });
    }
}

module.exports = OrderItemService;