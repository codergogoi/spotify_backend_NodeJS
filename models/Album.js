const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  genres: {
    type: String,
  },
  image: {
    type: String,
  },
  tracks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Track",
    },
  ],
  artist: {
    type: Schema.Types.ObjectId,
    ref: "Artist",
  },
});

AlbumSchema.methods.addTrack = function (track) {
  this.tracks.push(track);
  return this.save();
};

module.exports = mongoose.model("Album", AlbumSchema);
