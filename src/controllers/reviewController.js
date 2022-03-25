const Review = require('../models/review');
const User = require('../models/user');
const Album = require('../models/album');
const mongoose = require('mongoose');

exports.getReviews = async (req, res) => {
  // #swagger.tags = ['Reviews']
  try {
    const reviews = await Review.find();
    if (!reviews) return res.status(404).json('There no reviews published yet');
    res.status(201).send(reviews);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.getByReviewId = async (req, res) => {
  // #swagger.tags = ['Reviews']
  try {
    const review = await Review.findById(req.params.reviewId);
    if (!review) return res.status(404).send('Review not found');

    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.getByAlbumId = async (req, res) => {
  // #swagger.tags = ['Reviews']
  try {
    const review = await Review.find({ albumId: req.params.albumId });

    if (!review) return res.status(404).send('Review not found');

    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

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
      albumId: req.params.albumId,
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
    console.log(error);
  }
};
