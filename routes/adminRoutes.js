const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");

router.post("/login");
router.post("/new-plan", adminController.newPlan);
router.post("/artist", adminController.newArtist);
router.post("/album", adminController.newAlbum);
router.post("/track", adminController.newTrack);

module.exports = router;
