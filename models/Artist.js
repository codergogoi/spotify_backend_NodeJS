const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  genres: {
    type: String,
  },
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  albums: [
    {
      type: Schema.Types.ObjectId,
      ref: "Album",
    },
  ],
  image: {
    type: String,
  },
  popularity: {
    type: Number,
  },
});

ArtistSchema.methods.addAlbum = function (album) {
  this.albums.push(album);
  return this.save();
};

module.exports = mongoose.model("Artist", ArtistSchema);
