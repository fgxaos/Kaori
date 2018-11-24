/* eslint linebreak-style: ["error", "windows"] */

const express = require("express");

const router = express.Router();
const controller = require("../controllers");

router.get("/", controller.animesWatching.showWatching);

router
  .route("/addToWatching/:numberUrl/:endUrl")
  .get(controller.animesWatching.startNew);

router.route("/details/:animeID").post(controller.animesWatching.detailsAnime);

router
  .route("/changeDetails/:animeID")
  .post(controller.animesWatching.changeDetailsAnime);

router
  .route("/changeDetails/sendSeen/:animeID")
  .post(controller.animesWatching.sendSeen);

router.route('/delete/:id').get(controller.animesWatching.removeWatching);

module.exports = router;
