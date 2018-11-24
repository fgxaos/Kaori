/* eslint linebreak-style: ["error", "windows"] */

const AnimeWatching = require("../models/animeWatching");
const AnimeSeen = require("../models/animeSeen");

async function checkEx(uri) {
  // On vérifie si l'anime n'est pas déjà présent dans 'Watching' et 'Seen'
  const isInWatch = await AnimeWatching.find(
    { animeURL: uri },
    (err, anime) => {}
  );
  const isInSeen = await AnimeSeen.find({ uri }, (err, anime) => {});

  const boolInWatch = isInWatch.length !== 0;
  const boolInSeen = isInSeen.length !== 0;
  return boolInWatch || boolInSeen;
}

module.exports = checkEx;
