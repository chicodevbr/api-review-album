const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const routes = require('./server/routes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(routes);

const connection_string = process.env.MONGO_URI;
const PORT = process.env.PORT || 3333;

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
