const ArtistService = require('../service/artist');
const Artist = require('../models/artist');

exports.getAll = async (req, res) => {
  try {
    const artists = await ArtistService.getAllArtists();

    if (!artists) {
      return res.status(404).json('There are no artists published yet');
    }

    res.json(artists);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.add = async (req, res) => {
  try {
    let artist = await Artist.findOne({ name: req.body.name });
    if (artist) return res.status(400).send('Artist already exist');

    const createArtist = await ArtistService.addArtist(req.body);

    res.status(201).json(createArtist);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
