const express = require('express');
const { auth } = require('../middleware/auth');
const propertyController = require('../controllers/propertyController');

const router = express.Router();

// Public routes
router.get('/', propertyController.getAllProperties);
router.get('/:id', propertyController.getPropertyById);

// Protected routes
router.post('/', auth, propertyController.createProperty);
router.put('/:id', auth, propertyController.updateProperty);
router.delete('/:id', auth, propertyController.deleteProperty);

module.exports = router; 