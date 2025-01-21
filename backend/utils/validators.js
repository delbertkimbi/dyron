const { check } = require('express-validator');
const constants = require('../config/constants');

const validators = {
    propertyValidation: [
        check('title').trim().notEmpty().withMessage('Title is required')
            .isLength({ min: 3, max: 255 }).withMessage('Title must be between 3 and 255 characters'),
        check('description').trim().notEmpty().withMessage('Description is required'),
        check('price').isNumeric().withMessage('Price must be a number')
            .isFloat({ min: 0 }).withMessage('Price cannot be negative'),
        check('location').trim().notEmpty().withMessage('Location is required'),
        check('type').isIn(['room', 'apartment', 'land', 'hotel', 'guest house'])
            .withMessage('Invalid property type'),
        check('status').isIn(['available', 'sold']).withMessage('Invalid status')
    ],

    transactionValidation: [
        check('property_id').isInt().withMessage('Invalid property ID'),
        check('amount').isNumeric().withMessage('Amount must be a number')
            .isFloat({ min: 0 }).withMessage('Amount cannot be negative'),
        check('status').isIn(['pending', 'completed', 'cancelled', 'refunded'])
            .withMessage('Invalid transaction status')
    ]
};

module.exports = validators; 