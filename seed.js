const mongoose = require('mongoose');
const User = require('./models/userModel');         // Assuming these models are in the models folder
const Transaction = require('./models/transactionModel');

// MongoDB Connection
mongoose.connect('mongodb+srv://angrygk:6imn54UvVz5myr1q@sarva.e7ike.mongodb.net/?retryWrites=true&w=majority&appName=sarva').then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Helper function to generate random phone numbers
const generatePhoneNumber = () => {
  return '9' + Math.floor(Math.random() * 1000000000).toString().padStart(9, '0');
};

// Helper function to generate random transaction status and type
const getRandomStatus = () => {
  const statuses = ['success', 'pending', 'failed'];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

const getRandomType = () => {
  const types = ['debit', 'credit'];
  return types[Math.floor(Math.random() * types.length)];
};

// Create 10 Users
const createUsers = async () => {
  const users = [];
  for (let i = 0; i < 10; i++) {
    const user = new User({
      name: `User${i + 1}`,
      phoneNumber: generatePhoneNumber()
    });
    users.push(user);
  }
  return await User.insertMany(users);
};

// Create 10 Transactions
const createTransactions = async (users) => {
  const transactions = [];
  for (let i = 0; i < 10; i++) {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const transaction = new Transaction({
      status: getRandomStatus(),
      type: getRandomType(),
      transactionDate: new Date(),
      amount: Math.floor(Math.random() * 1000) + 100,  // Random amount between 100 and 1000
      userId: randomUser._id
    });
    transactions.push(transaction);
  }
  return await Transaction.insertMany(transactions);
};

// Seed Database
const seedDatabase = async () => {
  try {
    console.log('Creating users...');
    const users = await createUsers();
    console.log('10 users created!');

    console.log('Creating transactions...');
    await createTransactions(users);
    console.log('10 transactions created!');

    console.log('Seeding complete!');
    mongoose.disconnect();  // Close the connection once the data is seeded
  } catch (error) {
    console.error('Error seeding data:', error);
    mongoose.disconnect();  // Close the connection if there's an error
  }
};

// Run the seeding function
seedDatabase();
