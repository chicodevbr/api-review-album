const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const artistSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    maxlength: 1200,
  },
  country: {
    type: String,
  },
  discography: {
    album: [
      {
        albumId: {
          type: Schema.Types.ObjectId,
          ref: 'Album',
          required: true,
        },
      },
    ],
  },
});

module.exports = mongoose.model('Artist', artistSchema);
