const express = require('express')
const router = express.Router()
const { createTask, getTaskById, updateTask, deleteTask, moveTask, reorderTasks } = require('../controllers/task.controller')
const authMiddleware = require('../middleware/auth.middleware')

/**
 * @swagger
 * /api/columns/{id}/tasks:
 *   post:
 *     summary: Buat task baru di kolom
 *     tags: [Tasks]
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
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *               due_date:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Task berhasil dibuat
 */
router.post('/columns/:id/tasks', authMiddleware, createTask)

/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Detail satu task
 *     tags: [Tasks]
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
 *         description: Detail task
 */
router.get('/tasks/:id', authMiddleware, getTaskById)

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Update task
 *     tags: [Tasks]
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
 *               priority:
 *                 type: string
 *               due_date:
 *                 type: string
 *     responses:
 *       200:
 *         description: Task berhasil diupdate
 */
router.put('/tasks/:id', authMiddleware, updateTask)

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Hapus task
 *     tags: [Tasks]
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
 *         description: Task berhasil dihapus
 */
router.delete('/tasks/:id', authMiddleware, deleteTask)

/**
 * @swagger
 * /api/tasks/{id}/move:
 *   patch:
 *     summary: Pindahkan task ke kolom lain
 *     tags: [Tasks]
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
 *               column_id:
 *                 type: integer
 *               position:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Task berhasil dipindah
 */
router.patch('/tasks/:id/move', authMiddleware, moveTask)

/**
 * @swagger
 * /api/tasks/reorder:
 *   patch:
 *     summary: Atur ulang urutan task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tasks:
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
router.patch('/tasks/reorder', authMiddleware, reorderTasks)

module.exports = router