const News = require('../models/news');
const User = require('../models/user');

exports.post = async (req, res) => {
  // #swagger.tags = ["News"]
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).send('User not found');

    const { author, title, news, image } = req.body;

    let newNews = new News({
      author: author,
      title: title,
      news: news,
      image: image,
      userId: req.user._id,
    });

    newNews = await newNews.save();
    res.status(201).send(newNews);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
