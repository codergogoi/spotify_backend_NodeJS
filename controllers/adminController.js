const Plan = require("../models/plan");
const Artist = require("../models/Artist");
const Album = require("../models/Album");
const Track = require("../models/Track");

/**
 * Controller Functions
 */
exports.newPlan = (req, res, next) => {
  const { title, planType, description, features, price } = req.body;

  let plan = new Plan({
    title: title,
    planType: planType,
    description: description,
    features: features,
    price: price,
  });

  plan
    .save()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(503).json(err);
    });
};

exports.newArtist = (req, res, next) => {
  const { name, genres, image } = req.body;
  const artist = new Artist({
    name: name,
    genres: genres,
    followers: [],
    albums: [],
    image: image,
    popularity: 0,
  });
  artist
    .save()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(503).json(err);
    });
};

exports.newAlbum = (req, res, next) => {
  const { artistId, name, genres, image } = req.body;

  let currentArtist;
  Artist.findById(artistId)
    .then((artist) => {
      currentArtist = artist;
      let album = new Album({
        name: name,
        genres: genres,
        image: image,
        tracks: [],
        artist: artist,
      });
      return album.save();
    })
    .then((album) => {
      return currentArtist.addAlbum(album);
    })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(503).json(err);
    });
};

exports.newTrack = (req, res, next) => {
  const {
    albumId,
    name,
    duration,
    artworkImage,
    language,
    fileName,
  } = req.body;
  let currentAlbum;
  Album.findById(albumId)
    .populate("artist")
    .then((album) => {
      currentAlbum = album;
      const track = new Track({
        name: name,
        album: album,
        artist: album.artist,
        duration: duration,
        artworkImage: artworkImage,
        popularity: 0,
        language: language,
        fileName: fileName,
      });
      return track.save();
    })
    .then((track) => {
      return currentAlbum.addTrack(track);
    })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(503).json(err);
    });
};
