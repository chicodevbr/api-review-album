const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsSchema = new Schema({
  author: {
    type: String,
    required,
  },
  title: {
    type: String,
    required: true,
  },
  news: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  date: {
    type: Date,
    default: new Date(),
  },
  update: {
    type: Date,
  },
  updated: {
    type: Boolean,
    default: false,
  },
  likes: {
    type: Number,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('News', newsSchema);
