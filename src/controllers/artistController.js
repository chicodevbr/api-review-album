const ArtistService = require('../service/artist');
const Artist = require('../models/artist');

exports.getAll = async (req, res) => {
  /*
  #swagger.tags = ['Artists']
  #swagger.description = 'Endpoint que retorna lista de artistas cadastrados"
  */
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

exports.getArtistById = async (req, res) => {
  /*
  #swagger.tags = ['Artists']
  #swagger.description = 'Endpoint que retorna artista por Id."
  */
  try {
    const { artistId } = req.params;

    const artist = await Artist.findById(artistId).populate('albums');

    res.json(artist);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.add = async (req, res) => {
  /*
  #swagger.tags = ['Artists']
  #swagger.description = 'Endpoint para cadastrar novos artistas."
  */
  try {
    let artist = await Artist.findOne({ name: req.body.name });
    if (artist) return res.status(400).send('Artist already exist');

    const createArtist = await ArtistService.addArtist(req.body, req.user._id);

    res.status(201).json(createArtist);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
