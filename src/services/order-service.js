const mysql = require('mysql2');

class OrderService {
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

    createOrder(orderId,customerId, orderDate, totalAmount, storeId,orderStatus) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO `Order` (OrderID,CustomerID, OrderDate, TotalAmount, StoreID,OrderStatus) VALUES (?,?, ?, ?, ?,?)';
            this.connection.query(query, [orderId,customerId, orderDate, totalAmount, storeId,orderStatus], (error, results, fields) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve({ orderId: results.insertId, success: true, message: 'Заказ успешно создан' });
            });
        });
    }

    getOrderById(orderId) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM `Order` WHERE OrderID = ?';
            this.connection.query(query, [orderId], (error, results, fields) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results[0]);
            });
        });
    }
    getOrderByCustomerId(customerId){
        return new Promise((resolve,reject)=>{
            const query = 'SELECT * FROM `Order` WHERE CustomerID = ?';
            this.connection.query(query, [customerId], (error, results, fields) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results);
            });
        })
    }

    // Другие методы по необходимости...
}

module.exports = OrderService;