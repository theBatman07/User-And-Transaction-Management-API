const express = require('express');
const { getTransactionsByUserId, getAllTransactionsWithUserDetails, getAllTransactions, createTransaction } = require('../controllers/transactionController');
const router = express.Router();

// Get transactions by user ID with filters
router.get('/user/:userId', getTransactionsByUserId);

// Get all transactions with user details by filters
router.get('/', getAllTransactionsWithUserDetails);

// Get all transactions
router.get('/all', getAllTransactions);

// Create a new transaction
router.post('/', createTransaction);

module.exports = router;
