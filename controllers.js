/* eslint linebreak-style: ["error", "windows"] */

const animesSeen = require("./controllers/animesSeen.controller");
const setupController = require("./controllers/setupController.controller");
const extractMAL = require("./controllers/extractMAL.controller");
const animesWatching = require("./controllers/animesWatching.controller");
// const apiController = require('./controllers/apiController');

module.exports = {
  animesSeen,
  setupController,
  extractMAL,
  animesWatching
};
