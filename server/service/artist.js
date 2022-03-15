const Artist = require('../models/artist');

module.exports = class ArtistService {
  static async getAllArtists() {
    try {
      const allArtist = await Artist.find();
      return allArtist;
    } catch (error) {
      console.log(`Could not fetch artists ${error}`);
    }
  }

  static async addArtist(data) {
    try {
      const newArtist = {
        name: data.name,
        description: data.description,
        country: data.country,
      };

      const response = await new Album(newAlbum).save();
      return response;
    } catch (error) {
      console.log(error);
    }
  }
};
