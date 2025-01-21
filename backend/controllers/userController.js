const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/dbConfig');
const constants = require('../config/constants');

const userController = {
    registerUser: async (req, res) => {
        const { name, email, password, phone, role } = req.body;

        try {
            const connection = await pool.getConnection();

            // Check if user exists
            const [existingUser] = await connection.query(
                'SELECT id FROM users WHERE email = ?',
                [email]
            );

            if (existingUser.length) {
                connection.release();
                return res.status(409).json({ error: 'Email already registered' });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, constants.SALT_ROUNDS);

            // Insert user
            const [result] = await connection.query(
                'INSERT INTO users (name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)',
                [name, email, hashedPassword, phone, role]
            );

            connection.release();

            // Generate token
            const token = jwt.sign(
                { id: result.insertId, role },
                process.env.JWT_SECRET,
                { expiresIn: constants.JWT_EXPIRES_IN }
            );

            res.status(201).json({
                message: 'User registered successfully',
                token,
                user: {
                    id: result.insertId,
                    name,
                    email,
                    role
                }
            });
        } catch (error) {
            console.error('Registration error:', error);
            res.status(500).json({ error: 'Server error during registration' });
        }
    },

    loginUser: async (req, res) => {
        const { email, password } = req.body;

        try {
            const connection = await pool.getConnection();
            const [user] = await connection.query(
                'SELECT * FROM users WHERE email = ?',
                [email]
            );

            if (!user.length) {
                connection.release();
                return res.status(401).json({ error: 'Invalid email or password' });
            }

            const isMatch = await bcrypt.compare(password, user[0].password);
            if (!isMatch) {
                connection.release();
                return res.status(401).json({ error: 'Invalid email or password' });
            }

            // Generate token
            const token = jwt.sign(
                { id: user[0].id, role: user[0].role },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            connection.release();
            res.json({
                token,
                user: {
                    id: user[0].id,
                    name: user[0].name,
                    email: user[0].email,
                    role: user[0].role
                }
            });
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({ error: 'Server error during login' });
        }
    },

    getUserProfile: async (req, res) => {
        try {
            const connection = await pool.getConnection();
            
            const [users] = await connection.query(
                'SELECT id, name, email, phone, role, created_at FROM users WHERE id = ?',
                [req.user.id]
            );

            connection.release();

            if (!users.length) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.json(users[0]);
        } catch (error) {
            console.error('Profile fetch error:', error);
            res.status(500).json({ error: 'Server error while fetching profile' });
        }
    },

    updateUserProfile: async (req, res) => {
        const { name, phone } = req.body;

        try {
            const connection = await pool.getConnection();
            
            await connection.query(
                'UPDATE users SET name = ?, phone = ? WHERE id = ?',
                [name, phone, req.user.id]
            );

            connection.release();

            res.json({ message: 'Profile updated successfully' });
        } catch (error) {
            next(error);
        }
    },

    getAllUsers: async (req, res) => {
        try {
            const connection = await pool.getConnection();
            
            const [users] = await connection.query(
                'SELECT id, name, email, phone, role, created_at FROM users'
            );

            connection.release();

            res.json(users);
        } catch (error) {
            next(error);
        }
    },

    forgotPassword: async (req, res) => {
        const { email } = req.body;

        try {
            const connection = await pool.getConnection();
            const [user] = await connection.query(
                'SELECT id FROM users WHERE email = ?',
                [email]
            );

            if (!user.length) {
                connection.release();
                return res.status(404).json({ error: 'User not found' });
            }

            // Generate reset token
            const resetToken = crypto.randomBytes(32).toString('hex');
            const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

            await connection.query(
                'UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE email = ?',
                [resetToken, resetTokenExpiry, email]
            );

            connection.release();

            // In production, send email with reset link
            // For now, just return success
            res.json({ message: 'Password reset instructions sent' });
        } catch (error) {
            console.error('Password reset error:', error);
            res.status(500).json({ error: 'Server error during password reset' });
        }
    }
};

module.exports = userController;
