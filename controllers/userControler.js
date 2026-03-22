
// import pool from '../config/dbconfig.js';
import userModel from '../modles/userModel.js';

export const getAllUsers = async (req, res) => {
    try {
        const result = await userModel.findAll();
        res.json(result);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
export const getUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        const result = await userModel.findByPk(userId);
        if (!result) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(result);
    } catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
export const createUser = async (req, res) => {
    const {name, email,password } = req.body;
    try {
        const result = await userModel.create({ name, email, password });
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
export const updateUser = async (req, res) => {
    const userId = req.params.id;
    const { name, email, password } = req.body;
    try {
        const result = await userModel.update({ name, email, password }, { where: { id: userId } });
        if (result[0] === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(`User ${name} updated successfully`);
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
export const deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const result = await userModel.destroy({ where: { id: userId } });
        if (result === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};