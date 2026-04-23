const pool = require('../db/index')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    const { name, email, password } = req.body

    try {
        const existing = await pool.query('SELECT * FROM users WHERE email = $1', [email])
        if (existing.rows.length > 0) {
            return res.status(400).json({ message: 'Email sudah terdaftar' })
        }

        if (password.length < 8) {
            return res.status(400).json({ message: 'Password minimal 8 karakter' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const result = await pool.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
            [name, email, hashedPassword]
        )

        res.status(201).json({ message: 'Registrasi berhasil', user: result.rows[0] })
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body

    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email])
        if (result.rows.length === 0) {
            return res.status(400).json({ message: 'Email atau password salah' })
        }

        const user = result.rows[0]

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: 'Email atau password salah' })
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )

        res.json({ token, user: { id: user.id, name: user.name, email: user.email } })
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

const getMe = async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT id, name, email, created_at FROM users WHERE id = $1',
            [req.user.id]
        )
        res.json(result.rows[0])
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

module.exports = { register, login, getMe }