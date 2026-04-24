const pool = require('../db/index')

const createColumn = async (req, res) => {
    const { id } = req.params // board_id
    const { title } = req.body
    try {
        const board = await pool.query(
            'SELECT * FROM boards WHERE id = $1 AND user_id = $2',
            [id, req.user.id]
        )
        if (board.rows.length === 0) {
            return res.status(404).json({ message: 'Board tidak ditemukan' })
        }

        const lastPos = await pool.query(
            'SELECT COALESCE(MAX(position), -1) + 1 AS pos FROM columns WHERE board_id = $1',
            [id]
        )

        const result = await pool.query(
            'INSERT INTO columns (board_id, title, position) VALUES ($1, $2, $3) RETURNING *',
            [id, title, lastPos.rows[0].pos]
        )
        res.status(201).json(result.rows[0])
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

const updateColumn = async (req, res) => {
    const { id } = req.params
    const { title } = req.body
    try {
        const result = await pool.query(
            'UPDATE columns SET title = $1 WHERE id = $2 RETURNING *',
            [title, id]
        )
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Kolom tidak ditemukan' })
        }
        res.json(result.rows[0])
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

const deleteColumn = async (req, res) => {
    const { id } = req.params
    try {
        const result = await pool.query(
            'DELETE FROM columns WHERE id = $1 RETURNING *',
            [id]
        )
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Kolom tidak ditemukan' })
        }
        res.json({ message: 'Kolom berhasil dihapus' })
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

const reorderColumns = async (req, res) => {
    const { columns } = req.body
    try {
        await Promise.all(
            columns.map((col) =>
                pool.query('UPDATE columns SET position = $1 WHERE id = $2', [col.position, col.id])
            )
        )
        res.json({ message: 'Urutan kolom berhasil diupdate' })
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

module.exports = { createColumn, updateColumn, deleteColumn, reorderColumns }