const mongoose = require('mongoose');
const app = require('./src/app');

const dotenv = require('dotenv');
const environment = require('./src/config/environment');

dotenv.config();

const connection_string = process.env.MONGO_URI;
const PORT = environment.port;

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
