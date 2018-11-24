const express = require("express");

const router = express.Router();
const controller = require("../controllers");
// var mongoose = require('mongoose');

router.route("/search").get(controller.extractMAL.search);

//router.post("/searchAnime", controller.extractMAL.searchAnimes);
router.get("/searchAnime/:searchValue", controller.extractMAL.searchAnimes);

router.get("/searchAnime/:numberURL/:endingURL/episodesNames", controller.extractMAL.extractEpisodes);

module.exports = router;
