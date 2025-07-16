/*jshint esversion: 8 */
const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const connectToDatabase = require('../models/db');

// GET all gifts
router.get('/', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('gifts');
    const gifts = await collection.find({}).toArray();
    res.json(gifts);
  } catch (e) {
    console.error('Error fetching gifts:', e);
    res.status(500).send('Error fetching gifts');
  }
});

// GET gift by id
router.get('/:id', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('gifts');
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).send('Invalid ID format');
    }

    const gift = await collection.findOne({ _id: new ObjectId(id) });

    if (!gift) {
      return res.status(404).send('Gift not found');
    }

    res.json(gift);
  } catch (e) {
    console.error('Error fetching gift:', e);
    res.status(500).send('Error fetching gift');
  }
});

// POST new gift
router.post('/', async (req, res, next) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('gifts');
    const result = await colle
