const express = require('express')
const router = express.Router()
const { getBoards, createBoard, getBoardById, updateBoard, deleteBoard } = require('../controllers/board.controller')
const authMiddleware = require('../middleware/auth.middleware')

/**
 * @swagger
 * /api/boards:
 *   get:
 *     summary: Ambil semua board milik user
 *     tags: [Boards]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List board
 */
router.get('/', authMiddleware, getBoards)

/**
 * @swagger
 * /api/boards:
 *   post:
 *     summary: Buat board baru
 *     tags: [Boards]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               color:
 *                 type: string
 *     responses:
 *       201:
 *         description: Board berhasil dibuat
 */
router.post('/', authMiddleware, createBoard)

/**
 * @swagger
 * /api/boards/{id}:
 *   get:
 *     summary: Detail board + kolom + tasks
 *     tags: [Boards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detail board
 */
router.get('/:id', authMiddleware, getBoardById)

/**
 * @swagger
 * /api/boards/{id}:
 *   put:
 *     summary: Update board
 *     tags: [Boards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               color:
 *                 type: string
 *     responses:
 *       200:
 *         description: Board berhasil diupdate
 */
router.put('/:id', authMiddleware, updateBoard)

/**
 * @swagger
 * /api/boards/{id}:
 *   delete:
 *     summary: Hapus board
 *     tags: [Boards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Board berhasil dihapus
 */
router.delete('/:id', authMiddleware, deleteBoard)

module.exports = router