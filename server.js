const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Pizza Ordering API is running!' });
});

// Auth routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Pizza routes
const pizzaRoutes = require('./routes/pizzaRoutes');
app.use('/api/pizzas', pizzaRoutes);

// Inventory routes
const inventoryRoutes = require('./routes/inventoryRoutes');
app.use('/api/inventory', inventoryRoutes);

// Order routes
const orderRoutes = require('./routes/orderRoutes');
app.use('/api/orders', orderRoutes);

// Payment routes
const paymentRoutes = require('./routes/paymentRoutes');
app.use('/api/payment', paymentRoutes);

// Start server without MongoDB for testing
console.log('Starting server without MongoDB connection...');
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('Using in-memory database for testing');
});