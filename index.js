const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config;

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const indexRouter = require('./server/routes/index');
const albumRouter = require('./server/routes/albums');

app.use('/', indexRouter);
app.use('/albums', albumRouter);

const connection_string =
  process.env.MONGO_URI ||
  'mongodb+srv://admin:admin123@reviewapp.wqdu1.mongodb.net/ReviewApp?retryWrites=true&w=majority';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

mongoose
  .connect(connection_string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongDB connection established...'))
  .catch((error) => console.log('MongoDB connection failed:', error.message));
