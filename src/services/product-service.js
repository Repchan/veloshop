const mysql = require('mysql2');

class ProductService {
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

    getAllProducts() {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM Product', (error, results, fields) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results);
            });
        });
    }

    addProduct(productData) {
        return new Promise((resolve, reject) => {
            const { Name, Brand, Type, Color, Price, QuantityInStock, Category, StoreID,Description,ShortDescription} = productData;
            const query = 'INSERT INTO Product (Name, Brand, Type, Color, Price, QuantityInStock, Category, StoreID,Description,ShortDescription) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?,?)';
            this.connection.query(query, [Name, Brand, Type, Color, Price, QuantityInStock, Category, StoreID,Description,ShortDescription], (error, results, fields) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve({ success: true, message: 'Товар успешно добавлен' });
            });
        });
    }

    updateProduct(productId, productData) {
        return new Promise((resolve, reject) => {
            const { Name, Brand, Type, Color, Price, QuantityInStock, Category, StoreID ,Description,ShortDescription} = productData;
            const query = 'UPDATE Product SET Name=?, Brand=?, Type=?, Color=?, Price=?, QuantityInStock=?, Category=?, StoreID=?,Description=?,ShortDescription=? WHERE ProductID=?';
            this.connection.query(query, [Name, Brand, Type, Color, Price, QuantityInStock, Category, StoreID, productId,Description,ShortDescription], (error, results, fields) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve({ success: true, message: 'Товар успешно обновлен' });
            });
        });
    }

    deleteProduct(productId) {
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM Product WHERE ProductID=${productId}`;
            this.connection.query(query, [productId], (error, results, fields) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve({ success: true, message: 'Товар успешно удален' });
            });
        });
    }
    findProductsByName(name) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM Product WHERE Name LIKE ${name}`;
            this.connection.query(query, [`%${name}%`], (error, results, fields) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results);
            });
        });
    }

    // Поиск товаров по категории
    findProductsByCategory(category) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Product WHERE Category LIKE ?';
            this.connection.query(query, [`%${category}%`], (error, results, fields) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results);
            });
        });
    }

    // Поиск товаров по цвету
    findProductsByColor(color) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Product WHERE Color LIKE ?';
            this.connection.query(query, [`%${color}%`], (error, results, fields) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results);
            });
        });
    }

    // Поиск товаров по типу
    findProductsByType(type) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Product WHERE Type LIKE ?';
            this.connection.query(query, [`%${type}%`], (error, results, fields) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results);
            });
        });
    }
    findProductById(id){
        return new Promise((resolve, reject)=>{
            const query = 'SELECT * FROM Product WHERE ProductID LIKE ?';
            this.connection.query(query,[`%${id}%`],(error,results,fields)=>{
                if(error){
                    reject(error);
                    return
                }
                resolve(results)
            })
        })
    }
}

module.exports = ProductService;
