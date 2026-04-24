const express = require('express')
const router = express.Router()
const { createColumn, updateColumn, deleteColumn, reorderColumns } = require('../controllers/column.controller')
const authMiddleware = require('../middleware/auth.middleware')

/**
 * @swagger
 * /api/boards/{id}/columns:
 *   post:
 *     summary: Tambah kolom ke board
 *     tags: [Columns]
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
 *     responses:
 *       201:
 *         description: Kolom berhasil dibuat
 */
router.post('/boards/:id/columns', authMiddleware, createColumn)

/**
 * @swagger
 * /api/columns/{id}:
 *   put:
 *     summary: Update nama kolom
 *     tags: [Columns]
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
 *     responses:
 *       200:
 *         description: Kolom berhasil diupdate
 */
router.put('/columns/:id', authMiddleware, updateColumn)

/**
 * @swagger
 * /api/columns/{id}:
 *   delete:
 *     summary: Hapus kolom
 *     tags: [Columns]
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
 *         description: Kolom berhasil dihapus
 */
router.delete('/columns/:id', authMiddleware, deleteColumn)

/**
 * @swagger
 * /api/columns/reorder:
 *   patch:
 *     summary: Atur ulang urutan kolom
 *     tags: [Columns]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               columns:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     position:
 *                       type: integer
 *     responses:
 *       200:
 *         description: Urutan berhasil diupdate
 */
router.patch('/columns/reorder', authMiddleware, reorderColumns)

module.exports = router