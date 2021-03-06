const Artist = require('../models/artist');

module.exports = class ArtistService {
  static async getAllArtists() {
    try {
      const allArtist = await Artist.find().populate('albums');
      return allArtist;
    } catch (error) {
      console.log(`Could not fetch artists ${error}`);
    }
  }

  static async addArtist(data, userId) {
    try {
      const newArtist = {
        name: data.name,
        description: data.description,
        country: data.country,
        userId: userId,
      };

      const response = await new Artist(newArtist).save();
      return response;
    } catch (error) {
      console.log(error);
    }
  }
};
