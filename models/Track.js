const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SongSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  album: {
    type: Schema.Types.ObjectId,
    ref: "Album",
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: "Artist",
  },
  duration: {
    type: Number,
  },
  artworkImage: {
    type: String,
  },
  popularity: {
    // like
    type: Number,
  },
  language: {
    type: String,
  },
  fileName: {
    type: String,
  },
});

module.exports = mongoose.model("Track", SongSchema);
