const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  author: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  post: {
    type: String,
    required: true,
  },
  ratings: {
    type: Number,
    default: 0,
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
  albumId: {
    type: Schema.Types.ObjectId,
    ref: 'Album',
    required: true,
  },
});

module.exports = mongoose.model('Review', reviewSchema);
