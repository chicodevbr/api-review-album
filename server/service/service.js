const Album = require('../models/album');
const Joi = require('joi');

module.exports = class AlbumsService {
  static async getAllAlbums() {
    try {
      const allAlbums = await Album.find();
      return allAlbums;
    } catch (error) {
      console.log(`Could not fetch albums ${error}`);
    }
  }

  static async addAlbum(data) {
    try {
      const newAlbum = {
        name: data.name,
        artist: data.artist,
        year: data.year,
        label: data.label,
        producer: data.label,
        sales: data.sales,
        streams: data.streams,
        imgUrl: data.imgUrl,
        date: data.date,
      };

      const response = await new Album(newAlbum).save();
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  static async getAlbumById(albumId) {
    try {
      const album = await Album.findById({ _id: albumId });
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
