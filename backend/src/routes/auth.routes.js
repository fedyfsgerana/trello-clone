const express = require('express')
const router = express.Router()
const { register, login, getMe } = require('../controllers/auth.controller')
const authMiddleware = require('../middleware/auth.middleware')

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Daftar akun baru
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Registrasi berhasil
 *       400:
 *         description: Email sudah terdaftar
 */
router.post('/register', register)

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login dan dapat JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login berhasil, dapat token
 *       400:
 *         description: Email atau password salah
 */
router.post('/login', login)

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Data user yang sedang login
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Data user
 *       401:
 *         description: Token tidak valid
 */
router.get('/me', authMiddleware, getMe)

module.exports = router