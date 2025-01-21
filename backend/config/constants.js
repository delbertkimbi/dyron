const constants = {
    JWT_EXPIRES_IN: '24h',
    SALT_ROUNDS: 10,
    ROLES: {
        BUYER: 'buyer',
        SELLER: 'seller',
        ADMIN: 'admin'
    },
    PROPERTY_STATUS: {
        AVAILABLE: 'available',
        SOLD: 'sold'
    },
    TRANSACTION_STATUS: {
        PENDING: 'pending',
        COMPLETED: 'completed',
        CANCELLED: 'cancelled',
        REFUNDED: 'refunded'
    }
};

module.exports = constants; 