const mongoose = require("mongoose");

const fs = require("fs");
const Plan = require("../models/plan");
const Artist = require("../models/Artist");
const Album = require("../models/Album");
const Track = require("../models/Track");

/**
 * Artist
 */

exports.topArtist = (req, res, next) => {
  Artist.find({
    genres: { $in: ["rock", "pop", "bollywood", "folk"] },
  })
    .populate("albums")
    .then((artist) => {
      res.status(200).json(artist);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};

exports.getAlbumsByArtis = (req, res, next) => {
  const artistId = req.params.id;
  Artist.findById(artistId)
    .populate("albums")
    .then((artist) => {
      res.status(200).json(artist);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};

/**
 * ALBUMS
 */

exports.topAlbums = (req, res, next) => {
  Album.find({
    genres: { $in: ["rock", "pop", "bollywood", "folk"] },
  })
    .populate("tracks")
    .populate("artist")
    .then((albums) => {
      res.status(200).json(albums);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};

exports.getAlbumDetails = (req, res, next) => {
  const albumId = req.params.id;
  Album.findById(albumId)
    .populate("tracks")
    .populate("artist")
    .then((album) => {
      res.status(200).json(album);
    })
    .catch((err) => {
      err.statusCode = 500;
      next(err);
    });
};

exports.getTrackDetails = (req, res, next) => {
  const trackId = req.params.id;
  Track.findById(trackId)
    .populate("album")
    .populate("artist")
    .then((track) => {
      res.status(200).json(track);
    })
    .catch((err) => {
      err.statusCode = 500;
      next(err);
    });
};

exports.playTrack = async (req, res, next) => {
  const trackId = req.params.id;

  const track = await Track.findById(trackId);

  if (track._id) {
    const path = "s3_musics/" + track.fileName;
    const stat = fs.statSync(path);
    const fileSize = stat.size;
    const range = req.headers.range;
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunkSize = end - start + 1;
      const file = fs.createReadStream(path, { start, end });

      const head = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Range": "bytes",
        "Content-Length": chunkSize,
        "Content-Type": "audio/mpeg",
      };

      res.writeHead(206, head);
      file.pipe(res);
    } else {
      res.status(404).json("Audio file Does not exist");
    }
  } else {
    res.status(404).json("Audio Does not exist");
  }
};
