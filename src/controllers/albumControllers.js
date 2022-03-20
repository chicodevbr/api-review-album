const AlbumsService = require('../service/album');
const Artist = require('../models/artist');

exports.getById = async (req, res) => {
  const albumId = req.params.albumId;

  try {
    const album = await AlbumsService.getAlbumById(albumId);
    res.json(album);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.getAll = async (req, res) => {
  try {
    const albums = await AlbumsService.getAllAlbums();

    if (!albums) {
      return res.status(404).json('There are no albums published yet');
    }

    res.json(albums);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.add = async (req, res) => {
  try {
    const {
      name,
      artist,
      description,
      year,
      label,
      producer,
      sales,
      streams,
      imgUrl,
      date,
    } = req.body;

    const newAlbum = {
      name: name,
      artist: artist,
      description: description,
      artist: [req.params.artistId],
      year: year,
      label: label,
      producer: producer,
      sales: sales,
      streams: streams,
      imgUrl: imgUrl,
      date: date,
      //userId: req.user._id,
    };

    const response = await new Album(newAlbum).save();

    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.update = async (req, res) => {
  let id = req.params.id;

  try {
    const album = {};
    album.name = req.body.name;
    album.artist = req.body.artist;
    album.description = req.body.description;
    album.year = req.body.year;
    album.label = req.body.label;
    album.producer = req.body.producer;
    album.sales = req.body.sales;
    album.streams = req.body.streams;
    album.imgUrl = req.body.imgUrl;
    album.date = req.body.date;

    const updateAlbum = await AlbumsService.updateAlbum(id, album);

    if (updateAlbum.nModified === 0) {
      return res.status(404).json({});
    }

    res.json(updateAlbum);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.delete = async (req, res) => {
  let id = req.params.id;

  try {
    const deleteResponse = await AlbumsService.deleteAlbum(id);
    res.json(deleteResponse);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
