const express = require("express");

const router = express.Router();
const controller = require("../controllers");

router.route("/").get(controller.animesSeen.showSeen);

router.route("/details/:animeID").post(controller.animesSeen.detailsAnime);

// router.route('/addNew').get(controller.animesSeen.startNew);

router
  .route("/changeDetails/sendWatching/:animeID")
  .get(controller.animesSeen.sendBackToWatching);

router.route("/delete/:id").get(controller.animesSeen.removeSeen);

module.exports = router;
