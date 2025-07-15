const express = require('express');
const app = express();

// Route imports
const giftroutes = require('./routes/giftRoutes');
const searchRoutes = require('./routes/searchRoutes'); // Task 1

// Middleware
app.use(express.json());

// Route mounting
app.use('/api/gifts', giftroutes);
app.use('/api/gifts', searchRoutes); // Task 2

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
