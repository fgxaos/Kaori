/* eslint linebreak-style: ["error", "windows"] */

const accueil = require("./routes/accueil.router");
const seen = require("./routes/animesSeen.router");
const extract = require("./routes/extractMAL.router");
const watching = require("./routes/animesWatching.router");

module.exports = {
  accueil,
  seen,
  extract,
  watching
};
