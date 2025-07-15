require('dotenv').config();
const express = require('express');
const axios = require('axios');
const logger = require('./logger');
const expressPino = require('express-pino-logger')({ logger });
<<<<<<< HEAD
const natural = require("natural");

const app = express();
=======
// Task 1: import the natural library
const natural = {{insert code here}}

// Task 2: initialize the express server
{{insert code here}}
>>>>>>> bdf6d7fb44d218aa2683ef920bbb202f05874848
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(expressPino);

// Define the sentiment analysis route
<<<<<<< HEAD
app.post('/sentiment', async (req, res) => {
    const { sentence } = req.query;
=======
// Task 3: create the POST /sentiment analysis
app.{{insert method here}}('{{insert route here}}', async (req, res) => {

    // Task 4: extract the sentence parameter
    const { sentence } = {{insert code here}};
>>>>>>> bdf6d7fb44d218aa2683ef920bbb202f05874848


    if (!sentence) {
        logger.error('No sentence provided');
        return res.status(400).json({ error: 'No sentence provided' });
    }

    // Initialize the sentiment analyzer with the Natural's PorterStemmer and "English" language
    const Analyzer = natural.SentimentAnalyzer;
    const stemmer = natural.PorterStemmer;
    const analyzer = new Analyzer("English", stemmer, "afinn");

    // Perform sentiment analysis
    try {
        const analysisResult = analyzer.getSentiment(sentence.split(' '));

        let sentiment = "neutral";

<<<<<<< HEAD
        if (analysisResult < 0) {
            sentiment = "negative";
        } else if (analysisResult > 0.33) {
            sentiment = "positive";
        }

        // Logging the result
        logger.info(`Sentiment analysis result: ${analysisResult}`);
        // Responding with the sentiment analysis result
        res.status(200).json({ sentimentScore: analysisResult, sentiment: sentiment });
    } catch (error) {
        logger.error(`Error performing sentiment analysis: ${error}`);
        res.status(500).json({ message: 'Error performing sentiment analysis' });
    }
});

// Start the server
app.listen(port, () => {
    logger.info(`Server running on port ${port}`);
});
=======
        // Task 5: set sentiment to negative or positive based on score rules
        {{insert code here}}

        // Logging the result
        logger.info(`Sentiment analysis result: ${analysisResult}`);

        // Task 6: send a status code of 200 with both sentiment score and the sentiment txt in the format { sentimentScore: analysisResult, sentiment: sentiment }
        {{insert code here}}
    } catch (error) {
        logger.error(`Error performing sentiment analysis: ${error}`);
        // Task 7: if there is an error, return a HTTP code of 500 and the json {'message': 'Error performing sentiment analysis'}
        {{insert code here}}
    }
});

app.listen(port, () => {
    logger.info(`Server running on port ${port}`);
});
>>>>>>> bdf6d7fb44d218aa2683ef920bbb202f05874848
