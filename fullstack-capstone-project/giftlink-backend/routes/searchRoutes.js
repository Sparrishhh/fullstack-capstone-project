const express = require('express');
const router = express.Router();
const { connectToDatabase } = require('../path/to/dbConnection'); // Adjust the path as needed

// GET /api/gifts - Search and filter gifts
router.get('/', async (req, res) => {
  try {
    // ✅ Task 1: Connect to MongoDB
    const db = await connectToDatabase();
    const collection = db.collection('gifts');

    // Extract query parameters
    const { name, category, condition, age } = req.query;

    // Initialize the query object
    const query = {};

    // ✅ Task 2: Check if the name exists and is not empty
    if (name && name.trim() !== '') {
      query.name = { $regex: new RegExp(name, 'i') }; // Case-insensitive partial match
    }

    // ✅ Task 3: Add other filters
    if (category && category.trim() !== '') {
      query.category = category;
    }

    if (condition && condition.trim() !== '') {
      query.condition = condition;
    }

    if (age && age.trim() !== '') {
      query.age = age;
    }

    // Find matching documents
    const gifts = await collection.find(query).toArray();

    res.status(200).json(gifts);
  } catch (error) {
    console.error('Error searching gifts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
