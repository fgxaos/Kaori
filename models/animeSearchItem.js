/* eslint linebreak-style: ["error", "windows"] */
const mongoose = require("mongoose");
const AnimeSeen = require("../models/animeSeen");

/* eslint-disable */
const transferWToS = anime => {
  /* eslint-enable */
  const numberEpisodes = anime.numepisodes;

  const newAnime = new AnimeSeen({
    url: anime.animeURL,
    title: anime.title,
    japanese: anime.japanese,
    picture: anime.picture,
    synopsis: anime.synopsis,
    numepisodes: numberEpisodes,
    episodeSeen: anime.episodeSeen,
    premiered: anime.premiered,
    status: anime.status,
    studios: anime.studios,
    genres: anime.genres,
    rating: anime.rating,
    score: anime.score,
    ranked: anime.ranked,
    popularity: anime.popularity,
    persoScore: anime.persoScore,
    finished: anime.finished,
    completed: true,
    numberURL: anime.numberURL,
    endingURL: anime.endingURL
  });

  AnimeSeen.create(newAnime, (err, res) => {
    if (err) throw err;
    else {
      console.log("Success !");
    }
  });
};

module.exports = transferWToS;
