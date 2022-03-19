const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const albumSchema = Schema({
  name: {
    type: String,
    maxlength: 200,
  },
  artist: {
    type: String,
    maxlength: 80,
  },
  artistId: {
    type: Schema.Types.ObjectId,
    ref: 'Artist',
    required: false,
  },
  description: {
    type: String,
    maxlength: 1200,
  },
  year: Number,
  label: {
    type: String,
    maxlength: 30,
  },
  producer: {
    type: String,
    maxlength: 30,
  },
  sales: Number,
  streams: Number,
  imgUrl: String,
  imageAlbum: {
    type: String,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    default: new Date(),
  },
  reviews: {
    review: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Review',
      },
    ],
  },
});

module.exports = Album = mongoose.model('Album', albumSchema);
