/* eslint linebreak-style: ["error", "windows"] */
const mongoose = require("mongoose");
const AnimeWatching = require("../models/animeWatching");

/* eslint-disable */
const transferSToW = anime => {
  /* eslint-enable */
  const newAnime = new AnimeWatching({
    animeURL: anime.url,
    title: anime.title,
    japanese: anime.japanese,
    picture: anime.picture,
    synopsis: anime.synopsis,
    numepisodes: anime.numepisodes,
    episodeSeen: new Array(anime.numepisodes).fill(false),
    lastEpSeen: 0,
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
    completed: false
  });

  AnimeWatching.create(newAnime, (err, res) => {
    if (err) throw err;
    else {
      return("Success!");
    }
  });
};

module.exports = transferSToW;
