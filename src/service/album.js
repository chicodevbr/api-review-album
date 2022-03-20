const Album = require('../models/album');
const Artist = require('../models/artist');

//const Joi = require('joi');

module.exports = class AlbumsService {
  static async getAllAlbums() {
    try {
      const allAlbums = await Album.find();
      return allAlbums;
    } catch (error) {
      console.log(`Could not fetch albums ${error}`);
    }
  }

  static async addAlbum(data, userId, artistId) {
    try {
      const artist = await Artist.findById(artistId);

      const newAlbum = {
        name: data.name,
        artist: data.artist,
        artistId: artistId,
        description: data.description,
        year: data.year,
        label: data.label,
        producer: data.producer,
        sales: data.sales,
        streams: data.streams,
        imgUrl: data.imgUrl,
        date: data.date,
        userId: userId,
      };

      const response = await artist.save(function (err) {
        if (err) return err;

        const newAlbum = new Album();
        newAlbum.save(function (err) {
          if (err) return err;
        });
      });

      //const response = await new Album(newAlbum).save();
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  static async getAlbumById(albumId) {
    try {
      const album = await Album.findById(albumId).populate('Artist');
      return album;
    } catch (error) {
      console.log(error);
    }
  }
  static async updateAlbum(id, album) {
    try {
      const updateResponse = await Album.updateOne({ _id: id }, { ...album });
      return updateResponse;
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteAlbum(albumId) {
    try {
      const deleteResponse = await Album.findByIdAndDelete({
        _id: albumId,
      });

      return deleteResponse;
    } catch (error) {
      console.log(`Could not delete album ${error}`);
    }
  }
};
