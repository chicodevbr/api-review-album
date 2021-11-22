const { Album } = require('../models/album');
const express = require('express');

const router = express.Router();
const store = require('../middleware/multer');
const Joi = require('joi');

// get
router.get('/', async (req, res) => {
  try {
    const albums = await Album.find().sort({ date: -1 });

    res.send(albums);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
});

// post
router.post('/', store.single('imageAlbum'), async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(200),
    artist: Joi.string().min(2).max(80),
    year: Joi.number(),
    label: Joi.string().min(2).max(30),
    producer: Joi.string().min(3).max(30),
    sales: Joi.number(),
    streams: Joi.number(),
    imgUrl: Joi.string(),
    imageAlbum: Joi.string(),
    date: Joi.date(),
  });

  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const { name, artist, year, label, producer, sales, streams, imgUrl, date } =
    req.body;

  let album = new Album({
    name,
    artist,
    year,
    label,
    producer,
    sales,
    streams,
    imgUrl,
    imageAlbum: req.file.originalname,
    date,
  });

  try {
    album = await album.save();
    res.send(album);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
});

//put
router.put('/:id', async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(200).required(),
    artist: Joi.string().min(2).max(80),
    year: Joi.number(),
    label: Joi.string().min(2).max(30),
    producer: Joi.string().min(3).max(30),
    sales: Joi.number(),
    streams: Joi.number(),
    imgUrl: Join.string(),
    imageAlbum: Joi.string(),
    date: Joi.date(),
  });

  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  try {
    const album = Album.findById(req.params.id);

    if (!album) return res.status(404).send('Album not found...');
    /* if(todo.uid !== req.user._id)
      return res.status(401).send('Album update failed. Not authorized...')*/
    const {
      name,
      artist,
      year,
      label,
      producer,
      sales,
      streams,
      date,
      imgUrl,
    } = req.body;

    const updateAlbum = await Album.findByIdAndUpdate(
      req.params.id,
      {
        name,
        artist,
        year,
        label,
        producer,
        sales,
        streams,
        imgUrl,
        imageAlbum: req.file.originalname,
      },
      { new: true }
    );
    res.send(updateAlbum);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const album = await Album.findById(req.params.id);
    if (!album) return res.status(404).send('Album not found...');

    const deleteAlbum = await Album.findByIdAndDelete(req.params.id);

    res.send(deleteAlbum);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
});

module.exports = router;
