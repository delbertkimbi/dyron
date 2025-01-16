const express = require('express');
const { signupUser, getAllUsers } = require('../controllers/userController');

const router = express.Router();

router.post('/signup', signupUser);

router.get('/', getAllUsers);

module.exports = router;
