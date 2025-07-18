require('dotenv').config();
const express = require('express');
const logger = require('./logger');
const expressPino = require('express-pino-logger')({ logger });
const natural = require("natural");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(expressPino);

// Root route to handle GET /
app.get('/', (req, res) => {
  res.send('Welcome to the Sentiment Analysis API. Use POST /sentiment with a sentence in the request body.');
});

// POST route for sentiment analysis
app.post('/sentiment', async (req, res) => {
  const { sentence } = req.body; // ✅ Updated from req.query to req.body

  if (!sentence) {
    logger.error('No sentence provided');
    return res.status(400).json({ error: 'No sentence provided' });
  }

  try {
    // Initialize sentiment analyzer
    const Analyzer = natural.SentimentAnalyzer;
    const stemmer = natural.PorterStemmer;
    const analyzer = new Analyzer("English", stemmer, "afinn");

    // Analyze sentiment
    const score = analyzer.getSentiment(sentence.split(' '));
    let sentiment = "neutral";

    if (score < 0) {
      sentiment = "negative";
    } else if (score > 0.33) {
      sentiment = "positive";
    }

    logger.info(`Sentiment analysis score: ${score}`);
    res.status(200).json({ sentimentScore: score, sentiment: sentiment });

  } catch (error) {
    logger.error(`Error during sentiment analysis: ${error}`);
    res.status(500).json({ message: 'Error performing sentiment analysis' });
  }
});

// Start the server
app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});
