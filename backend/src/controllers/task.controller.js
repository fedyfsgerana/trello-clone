const pool = require('../db/index')

const createTask = async (req, res) => {
    const { id } = req.params // column_id
    const { title, description, priority, due_date } = req.body
    try {
        const lastPos = await pool.query(
            'SELECT COALESCE(MAX(position), -1) + 1 AS pos FROM tasks WHERE column_id = $1',
            [id]
        )

        const result = await pool.query(
            `INSERT INTO tasks (column_id, title, description, priority, due_date, position)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [id, title, description, priority || 'medium', due_date || null, lastPos.rows[0].pos]
        )
        res.status(201).json(result.rows[0])
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

const getTaskById = async (req, res) => {
    const { id } = req.params
    try {
        const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [id])
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Task tidak ditemukan' })
        }
        res.json(result.rows[0])
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

const updateTask = async (req, res) => {
    const { id } = req.params
    const { title, description, priority, due_date } = req.body
    try {
        const result = await pool.query(
            `UPDATE tasks SET title = $1, description = $2, priority = $3, due_date = $4
       WHERE id = $5 RETURNING *`,
            [title, description, priority, due_date || null, id]
        )
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Task tidak ditemukan' })
        }
        res.json(result.rows[0])
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

const deleteTask = async (req, res) => {
    const { id } = req.params
    try {
        const result = await pool.query(
            'DELETE FROM tasks WHERE id = $1 RETURNING *',
            [id]
        )
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Task tidak ditemukan' })
        }
        res.json({ message: 'Task berhasil dihapus' })
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

const moveTask = async (req, res) => {
    const { id } = req.params
    const { column_id, position } = req.body
    try {
        const result = await pool.query(
            'UPDATE tasks SET column_id = $1, position = $2 WHERE id = $3 RETURNING *',
            [column_id, position, id]
        )
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Task tidak ditemukan' })
        }
        res.json(result.rows[0])
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

const reorderTasks = async (req, res) => {
    const { tasks } = req.body
    try {
        await Promise.all(
            tasks.map((task) =>
                pool.query('UPDATE tasks SET position = $1 WHERE id = $2', [task.position, task.id])
            )
        )
        res.json({ message: 'Urutan task berhasil diupdate' })
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

module.exports = { createTask, getTaskById, updateTask, deleteTask, moveTask, reorderTasks }