const ArtistService = require('../service/artist');

exports.getAll = async (req, res) => {
  try {
    const artists = await ArtistService.getAllAlbums();

    if (!artists) {
      return res.status(404).json('There are no artists published yet');
    }

    res.json(artists);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.post = async (req, res) => {
  try {
    const createAlbum = await AlbumsService.addAlbum(req.body);
    res.status(201).json(createAlbum);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
