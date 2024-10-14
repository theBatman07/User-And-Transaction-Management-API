const Transaction = require('../models/transactionModel');
const User = require('../models/userModel');

// Get Transactions for a User by User ID
exports.getTransactionsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const { status, type, fromDate, toDate } = req.query;

    // Filters
    const query = { userId };
    if (status) query.status = status;
    if (type) query.type = type;
    if (fromDate || toDate) {
      query.transactionDate = {};
      if (fromDate) query.transactionDate.$gte = new Date(fromDate);
      if (toDate) query.transactionDate.$lte = new Date(toDate);
    }

    const transactions = await Transaction.find(query);
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get All Transactions with User Details
exports.getAllTransactionsWithUserDetails = async (req, res) => {
  try {
    const { status, type, fromDate, toDate } = req.query;

    // Filters
    const query = {};
    if (status) query.status = status;
    if (type) query.type = type;
    if (fromDate || toDate) {
      query.transactionDate = {};
      if (fromDate) query.transactionDate.$gte = new Date(fromDate);
      if (toDate) query.transactionDate.$lte = new Date(toDate);
    }

    // Populate user details in the transactions
    const transactions = await Transaction.find(query).populate('userId', 'name phoneNumber');
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get All Transactions
exports.getAllTransactions = async (req, res) => {
    try {
      const transactions = await Transaction.find().populate('userId', 'name phoneNumber');
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  };


// Create New Transaction
exports.createTransaction = async (req, res) => {
    try {
      const { status, type, transactionDate, amount, userId } = req.body;
  
      // Check if user exists
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Create a new transaction document
      const transaction = new Transaction({
        status,
        type,
        transactionDate: new Date(transactionDate), // Ensure it's a Date object
        amount,
        userId
      });
  
      // Save the transaction to the database
      const savedTransaction = await transaction.save();
      res.status(201).json(savedTransaction);
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error: error.message });
    }
  };