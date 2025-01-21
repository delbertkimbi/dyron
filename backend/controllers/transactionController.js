const pool = require('../config/dbConfig');
const constants = require('../config/constants');

const transactionController = {
    // Create new transaction
    createTransaction: async (req, res, next) => {
        const { property_id, amount } = req.body;
        const buyer_id = req.user.id;
        const status = 'pending'; // Default status for new transactions

        try {
            const connection = await pool.getConnection();

            // Check if property exists and is available
            const [property] = await connection.query(
                'SELECT user_id, status, price FROM properties WHERE id = ?',
                [property_id]
            );

            if (!property.length) {
                connection.release();
                return res.status(404).json({ error: 'Property not found' });
            }

            if (property[0].status !== 'available') {
                connection.release();
                return res.status(400).json({ error: 'Property is not available' });
            }

            if (property[0].user_id === buyer_id) {
                connection.release();
                return res.status(400).json({ error: 'Cannot purchase your own property' });
            }

            // Start transaction
            await connection.beginTransaction();

            try {
                // Create transaction record
                const [result] = await connection.query(
                    'INSERT INTO transactions (property_id, buyer_id, seller_id, amount, status) VALUES (?, ?, ?, ?, ?)',
                    [property_id, buyer_id, property[0].user_id, amount, status]
                );

                // Update property status
                await connection.query(
                    'UPDATE properties SET status = ? WHERE id = ?',
                    ['sold', property_id]
                );

                await connection.commit();
                connection.release();

                res.status(201).json({
                    message: 'Transaction created successfully',
                    transactionId: result.insertId,
                    reference: `TRX-${result.insertId}`
                });
            } catch (error) {
                await connection.rollback();
                connection.release();
                throw error;
            }
        } catch (error) {
            next(error);
        }
    },

    // Get transaction by ID
    getTransactionById: async (req, res, next) => {
        try {
            const connection = await pool.getConnection();
            
            const [transactions] = await connection.query(
                `SELECT t.*, 
                    p.title as property_title,
                    b.name as buyer_name,
                    s.name as seller_name
                FROM transactions t
                JOIN properties p ON t.property_id = p.id
                JOIN users b ON t.buyer_id = b.id
                JOIN users s ON t.seller_id = s.id
                WHERE t.id = ?`,
                [req.params.id]
            );

            connection.release();

            if (!transactions.length) {
                return res.status(404).json({ error: 'Transaction not found' });
            }

            // Check if user is authorized to view this transaction
            const transaction = transactions[0];
            if (![transaction.buyer_id, transaction.seller_id].includes(req.user.id) 
                && req.user.role !== 'admin') {
                return res.status(403).json({ error: 'Not authorized to view this transaction' });
            }

            res.json(transaction);
        } catch (error) {
            next(error);
        }
    },

    // Get user's transactions
    getUserTransactions: async (req, res, next) => {
        try {
            const connection = await pool.getConnection();
            
            const [transactions] = await connection.query(
                `SELECT t.*, 
                    p.title as property_title,
                    b.name as buyer_name,
                    s.name as seller_name
                FROM transactions t
                JOIN properties p ON t.property_id = p.id
                JOIN users b ON t.buyer_id = b.id
                JOIN users s ON t.seller_id = s.id
                WHERE t.buyer_id = ? OR t.seller_id = ?
                ORDER BY t.created_at DESC`,
                [req.user.id, req.user.id]
            );

            connection.release();
            res.json(transactions);
        } catch (error) {
            next(error);
        }
    },

    // Update transaction status
    updateTransactionStatus: async (req, res, next) => {
        const { status } = req.body;
        const transactionId = req.params.id;

        try {
            const connection = await pool.getConnection();
            
            // Check if transaction exists and user is authorized
            const [transaction] = await connection.query(
                'SELECT * FROM transactions WHERE id = ?',
                [transactionId]
            );

            if (!transaction.length) {
                connection.release();
                return res.status(404).json({ error: 'Transaction not found' });
            }

            // Only admin or seller can update transaction status
            if (transaction[0].seller_id !== req.user.id && req.user.role !== 'admin') {
                connection.release();
                return res.status(403).json({ error: 'Not authorized to update this transaction' });
            }

            await connection.beginTransaction();

            try {
                await connection.query(
                    'UPDATE transactions SET status = ? WHERE id = ?',
                    [status, transactionId]
                );

                // If transaction is cancelled, make property available again
                if (status === 'cancelled') {
                    await connection.query(
                        'UPDATE properties SET status = ? WHERE id = ?',
                        ['available', transaction[0].property_id]
                    );
                }

                await connection.commit();
                connection.release();

                res.json({ 
                    message: 'Transaction status updated successfully',
                    status: status
                });
            } catch (error) {
                await connection.rollback();
                connection.release();
                throw error;
            }
        } catch (error) {
            next(error);
        }
    }
};

module.exports = transactionController; 