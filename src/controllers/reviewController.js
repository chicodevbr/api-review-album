const Review = require('../models/review');
const User = require('../models/user');
const Album = require('../models/album');
const mongoose = require('mongoose');

exports.post = async (req, res) => {
  // #swagger.tags = ['Reviews']

  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).send('User not found');

    const album = await Album.findById(req.params.albumId);

    const { author, title, post } = req.body;

    const newReview = new Review({
      author: author,
      title: title,
      post: post,
      userId: req.user._id,
    });

    const session = await mongoose.startSession();
    session.startTransaction();
    await newReview.save({ session: session });
    album.reviews.push(newReview);
    await album.save({ session: session });
    await session.commitTransaction();

    res.status(201).json({ review: newReview });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
