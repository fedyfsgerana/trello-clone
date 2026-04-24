const pool = require('../db/index')

const getBoards = async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM boards WHERE user_id = $1 ORDER BY created_at DESC',
            [req.user.id]
        )
        res.json(result.rows)
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

const createBoard = async (req, res) => {
    const { title, description, color } = req.body
    try {
        const result = await pool.query(
            'INSERT INTO boards (user_id, title, description, color) VALUES ($1, $2, $3, $4) RETURNING *',
            [req.user.id, title, description, color || '#0079BF']
        )
        res.status(201).json(result.rows[0])
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

const getBoardById = async (req, res) => {
    const { id } = req.params
    try {
        const board = await pool.query(
            'SELECT * FROM boards WHERE id = $1 AND user_id = $2',
            [id, req.user.id]
        )
        if (board.rows.length === 0) {
            return res.status(404).json({ message: 'Board tidak ditemukan' })
        }

        const columns = await pool.query(
            'SELECT * FROM columns WHERE board_id = $1 ORDER BY position ASC',
            [id]
        )

        const columnsWithTasks = await Promise.all(
            columns.rows.map(async (col) => {
                const tasks = await pool.query(
                    'SELECT * FROM tasks WHERE column_id = $1 ORDER BY position ASC',
                    [col.id]
                )
                return { ...col, tasks: tasks.rows }
            })
        )

        res.json({ ...board.rows[0], columns: columnsWithTasks })
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

const updateBoard = async (req, res) => {
    const { id } = req.params
    const { title, description, color } = req.body
    try {
        const result = await pool.query(
            'UPDATE boards SET title = $1, description = $2, color = $3 WHERE id = $4 AND user_id = $5 RETURNING *',
            [title, description, color, id, req.user.id]
        )
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Board tidak ditemukan' })
        }
        res.json(result.rows[0])
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

const deleteBoard = async (req, res) => {
    const { id } = req.params
    try {
        const result = await pool.query(
            'DELETE FROM boards WHERE id = $1 AND user_id = $2 RETURNING *',
            [id, req.user.id]
        )
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Board tidak ditemukan' })
        }
        res.json({ message: 'Board berhasil dihapus' })
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

module.exports = { getBoards, createBoard, getBoardById, updateBoard, deleteBoard }