const News = require('../models/news');
const User = require('../models/user');

exports.getNews = async (req, res) => {
  // #swagger.tags = ['News']
  try {
    const news = await News.find();
    if (!news) return res.status(404).json('There no news published yet.');
    res.status(200).send(news);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getNewsById = async (req, res) => {
  // #swagger.tags = ['News']
  try {
    const news = await News.findById(req.params.newsId);
    if (!news) return res.status(404).send('News not found');

    res.status(200).json(news);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

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

exports.update = async (req, res) => {
  // #swagger.tags = ['News']
  try {
    const newsExists = await News.findById(req.params.newsId);
    if (!newsExists) return res.status(404).send('News not found.');

    const { title, news } = req.body;
    const updateNews = await News.findByIdAndUpdate(req.params.newsId, {
      title: title,
      news: news,
      update: new Date(),
      updated: true,
    });
    res.status(200).json(updateNews);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateLikes = async (req, res) => {
  // #swagger.tags = ["News"]
  try {
    const { newsId } = req.params;
    const updateLike = await News.findOneAndUpdate(
      { _id: newsId },
      { $inc: { likes: 1 } }
    );

    res.status(204).json(updateLike);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.delete = async (req, res) => {
  // #swagger.tags = ["News"]
  try {
    const news = await News.findById(req.params.newsId);
    if (!news) return res.status(404).send('News not found');

    if (news.userId.toString() !== req.user._id.toString()) {
      return res.status(401).send('Not authorized.');
    }

    const deleteNews = await News.findByIdAndDelete(req.params.newsId);

    res.status(204).send(deleteNews);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
