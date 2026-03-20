
import pool from '../config/dbconfig.js';

export const getAllUsers = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
export const getUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
export const createUser = async (req, res) => {
    const {name, email } = req.body;
    try {
        const result = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
export const updateUser = async (req, res) => {
    const userId = req.params.id;
    const { name, email } = req.body;
    try {
        const result = await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *', [name, email, userId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
export const deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [userId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};