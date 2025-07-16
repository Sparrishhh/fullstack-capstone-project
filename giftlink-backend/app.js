/*jshint esversion: 8 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pinoLogger = require('./logger');

const connectToDatabase = require('./models/db');
const giftRoutes = require('./routes/giftRoutes');  // Import giftRoutes
const searchRoutes = require('./routes/searchRoutes'); // Import searchRoutes if applicable

const app = express();
app.use(cors());
const port = process.env.PORT || 3060;

// Connect to MongoDB once when server starts
connectToDatabase()
  .then(() => {
    pinoLogger.info('Connected to DB');
  })
  .catch((e) => {
    console.error('Failed to connect to DB', e);
  });

app.use(express.json());

// Use the routes
app.use('/gifts', giftRoutes);
app.use('/search', searchRoutes); // If you have searchRoutes

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Internal Server Error');
});

// Test route
app.get('/', (req, res) => {
  res.send('Inside the server');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
