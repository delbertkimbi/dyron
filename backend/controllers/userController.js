const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/dbConfig');
const constants = require('../config/constants');

const userController = {
    registerUser: async (req, res) => {
        try {
            const { name, email, password, phone, role } = req.body;
            console.log('Registration request:', req.body); // Debug log

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            const query = `
                INSERT INTO users (name, email, password, phone, role)
                VALUES (?, ?, ?, ?, ?)
            `;

            const [result] = await pool.execute(query, [
                name,
                email,
                hashedPassword,
                phone,
                role || 'buyer'
            ]);

            console.log('Registration result:', result); // Debug log

            res.status(201).json({
                message: 'User registered successfully',
                userId: result.insertId
            });
        } catch (error) {
            console.error('Registration error:', error); // Debug log
            res.status(500).json({
                error: error.message || 'Error registering user'
            });
        }
    },

    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body;
            console.log('Login request:', { email }); // Debug log

            const [users] = await pool.execute(
                'SELECT * FROM users WHERE email = ?',
                [email]
            );

            if (users.length === 0) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            const user = users[0];
            const validPassword = await bcrypt.compare(password, user.password);

            if (!validPassword) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            const token = jwt.sign(
                { userId: user.id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            console.log('Login successful:', { userId: user.id }); // Debug log

            res.json({
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            });
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({
                error: error.message || 'Error during login'
            });
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
