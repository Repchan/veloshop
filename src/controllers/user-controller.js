// user-controller.js
const express = require('express');
const UserService = require('../services/user-service');

const router = express.Router();
const userService = new UserService();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API для управления пользователями
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Создание нового пользователя
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Username:
 *                 type: string
 *                 description: Имя пользователя
 *               FirstName:
 *                 type: string
 *                 description: Имя
 *               LastName:
 *                 type: string
 *                 description: Фамилия
 *               Email:
 *                 type: string
 *                 description: Электронная почта
 *               Address:
 *                 type: string
 *                 description: Адрес
 *               Phone:
 *                 type: string
 *                 description: Номер телефона
 *               Password:
 *                 type: string
 *                 description: Пароль
 *               Role:
 *                 type: string
 *                 description: Роль пользователя
 *     responses:
 *       200:
 *         description: Пользователь успешно создан
 */

router.post('/', async (req, res) => {

    try {
        const result = await userService.createUser(req.body);
        res.json(result);
    } catch (error) {
        console.error('Ошибка запроса:', error);
        res.status(500).send('Ошибка сервера');
    }
});

/**
 * @swagger
 * /users/{id}/block:
 *   put:
 *     summary: Блокировка пользователя
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Идентификатор пользователя
 *     responses:
 *       200:
 *         description: Пользователь успешно заблокирован
 */

router.put('/:id/block', async (req, res) => {
    try {
        const result = await userService.blockUser(req.params.id);
        res.json(result);
    } catch (error) {
        console.error('Ошибка запроса:', error);
        res.status(500).send('Ошибка сервера');
    }
});

/**
 * @swagger
 * /users/{id}/unblock:
 *   put:
 *     summary: Разблокировка пользователя
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Идентификатор пользователя
 *     responses:
 *       200:
 *         description: Пользователь успешно разблокирован
 */

router.put('/:id/unblock', async (req, res) => {
    try {
        const result = await userService.unblockUser(req.params.id);
        res.json(result);
    } catch (error) {
        console.error('Ошибка запроса:', error);
        res.status(500).send('Ошибка сервера');
    }
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Удаление пользователя
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Идентификатор пользователя
 *     responses:
 *       200:
 *         description: Пользователь успешно удален
 */

router.delete('/:id', async (req, res) => {
    try {
        const result = await userService.deleteUser(req.params.id);
        res.json(result);
    } catch (error) {
        console.error('Ошибка запроса:', error);
        res.status(500).send('Ошибка сервера');
    }
});

/**
 * @swagger
 * /users/{id}/change-role:
 *   put:
 *     summary: Смена роли пользователя
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Идентификатор пользователя
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Role:
 *                 type: string
 *                 description: Новая роль пользователя
 *     responses:
 *       200:
 *         description: Роль пользователя успешно изменена
 */

router.put('/:id/change-role', async (req, res) => {
    try {
        const result = await userService.changeUserRole(req.params.id, req.body.newRole);
        res.json(result);
    } catch (error) {
        console.error('Ошибка запроса:', error);
        res.status(500).send('Ошибка сервера');
    }
});

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Получение всех пользователей
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Успешный запрос. Возвращает список пользователей.
 */

router.get('/', async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) {
        console.error('Ошибка запроса:', error);
        res.status(500).send('Ошибка сервера');
    }
});
/**
 * @swagger
 * /users/{username}:
 *   get:
 *     summary: Получение пользователя по имени
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: Имя пользователя для поиска
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Успешный запрос. Возвращает пользователя.
 *       404:
 *         description: Пользователь не найден.
 */

router.get('/search/:username', async (req, res) => {
    try {
        const  username  = req.params.username;
        const user = await userService.getUserByName(username); // Используем объект с полем username
        if (user.length > 0) {
            res.json(user[0]);
        } else {
            res.status(404).send('Пользователь не найден');
        }
    } catch (error) {
        console.error('Ошибка запроса:', error);
        res.status(500).send('Ошибка сервера');
    }
});


module.exports = router;
