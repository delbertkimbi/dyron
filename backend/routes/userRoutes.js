const express = require('express');
const { signupUser, getAllUsers } = require('../controllers/userController');

const router = express.Router();

// Signup route
router.post('/signup', signupUser);

// Get all users route
router.get('/', getAllUsers);

module.exports = router;
