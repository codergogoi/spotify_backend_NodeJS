const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authCheck");

const musicController = require("../controllers/musicController");

/**
 * Artist
 */
// ALL Artist list
router.get("/artist", auth, musicController.topArtist);
//ALL albums of Artist
router.get("/artist/:id", auth, musicController.getAlbumsByArtis);

/**
 * ALL Albums
 */
router.get("/album", auth, musicController.topAlbums);
router.get("/album/:id", auth, musicController.getAlbumDetails);

router.get("/track/:id", auth, musicController.getTrackDetails);
router.get("/play/:id", auth, musicController.playTrack);

router.use("/", auth, musicController.topAlbums);

module.exports = router;
