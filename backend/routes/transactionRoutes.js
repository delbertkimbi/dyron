const express = require('express');
const { auth } = require('../middleware/auth');
const transactionController = require('../controllers/transactionController');

const router = express.Router();

router.post('/', auth, transactionController.createTransaction);
router.get('/my-transactions', auth, transactionController.getUserTransactions);

module.exports = router; 