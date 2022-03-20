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
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
  albums: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Album',
    },
  ],
});

module.exports = mongoose.model('Artist', artistSchema);
