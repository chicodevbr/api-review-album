const ArtistService = require('../service/artist');
const Artist = require('../models/artist');

exports.getAll = async (req, res) => {
  //#swagger.tags = ['Artists']
  try {
    const artists = await ArtistService.getAllArtists();

    if (!artists) {
      return res.status(404).json('There are no artists published yet');
    }

    res.status(200).json(artists);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.getArtistById = async (req, res) => {
  //#swagger.tags = ['Artists']
  try {
    const { artistId } = req.params;

    const artist = await Artist.findById(artistId).populate('albums');

    res.status(200).json(artist);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.add = async (req, res) => {
  //#swagger.tags = ['Artists']
  try {
    let artist = await Artist.findOne({ name: req.body.name });
    if (!artist) return res.status(400).send('Artist already exist');

    const createArtist = await ArtistService.addArtist(req.body, req.user._id);

    res.status(201).json(createArtist);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.update = async (req, res) => {
  //#swagger.tags = ['Artists']
  try {
    const artist = await Artist.findById(req.params.artistId);
    if (!artist) return res.status(404).send('Artist not found.');

    const { name, description, country } = req.body;
    const updatedArtist = await Artist.findByIdAndUpdate(req.params.artistId, {
      name,
      description,
      country,
    });
    res.status(201).send(updatedArtist);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
