// user-service.js

const mysql = require('mysql2');

class UserService {
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

    createUser(userData) {
        return new Promise((resolve, reject) => {
            const { Username, FirstName, LastName, Email, Address, Phone, Password, Role, IsBlocked } = userData;
            const query = 'INSERT INTO User (Username, FirstName, LastName, Email, Address, Phone, Password, Role, IsBlocked) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
            this.connection.query(query, [Username, FirstName, LastName, Email, Address, Phone, Password, Role, IsBlocked], (error, results, fields) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve({ success: true, message: 'Пользователь успешно создан' });
            });
        });
    }

    blockUser(userId) {
        return this.updateUserStatus(userId, true);
    }

    unblockUser(userId) {
        return this.updateUserStatus(userId, false);
    }

    deleteUser(userId) {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM User WHERE UserID=?';
            this.connection.query(query, [userId], (error, results, fields) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve({ success: true, message: 'Пользователь успешно удален' });
            });
        });
    }

    changeUserRole(userId, newRole) {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE User SET Role=? WHERE UserID=?';
            this.connection.query(query, [newRole, userId], (error, results, fields) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve({ success: true, message: 'Роль пользователя успешно изменена' });
            });
        });
    }

    getAllUsers() {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM User', (error, results, fields) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results);
            });
        });
    }

    getUserByName(username) {
        return new Promise((resolve, reject) => {

            this.connection.query('SELECT * FROM User WHERE Username = ?', [username], (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        });
    }

    updateUserStatus(userId, isBlocked) {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE User SET IsBlocked=? WHERE UserID=?';
            this.connection.query(query, [isBlocked, userId], (error, results, fields) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve({ success: true, message: `Статус пользователя успешно ${isBlocked ? 'заблокирован' : 'разблокирован'}` });
            });
        });
    }
}

module.exports = UserService;
