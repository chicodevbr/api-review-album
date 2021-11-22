const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const albumSchema = new Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 200,
  },
  artist: {
    type: String,
    minlength: 3,
    maxlength: 80,
  },
  year: Number,
  label: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  producer: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  sales: Number,
  streams: Number,
  imgUrl: String,
  imageAlbum: {
    type: String,
  },
  date: {
    type: Date,
    default: new Date(),
  },
  review: [
    {
      type: Schema.Types.ObjectId,
      ref: 'review',
    },
  ],
});

const Album = mongoose.model('Album', albumSchema);
exports.Album = Album;
