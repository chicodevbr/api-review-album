const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config;

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to Album Review API...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running...`);
});
