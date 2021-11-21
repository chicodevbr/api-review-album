const albums = require('./server/routes/albums');
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

app.use('/albums', albums);

const connection_string = process.env.MONGO_URI;

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running...`);
});

mongoose
  .connect(connection_string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongDB connection established...'))
  .catch((error) => console.log('MongoDB connection failed:', error.message));
