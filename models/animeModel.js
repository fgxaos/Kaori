const mongoose = require("mongoose");

const animeInfos = new mongoose.Schema({
  url: String,
  title: String,
  japanese: String,
  picture: String,
  synopsis: String,
  numepisodes: Number,
  episodeSeen: Array,
  premiered: String,
  status: String,
  studios: String,
  genres: String,
  rating: String,
  score: Number,
  ranked: Number,
  popularity: Number,
  persoScore: Number,
  finished: Boolean,
  completed: Boolean,
  endingURL: String,
  numberURL: String
});

const Animes = mongoose.model("animeinfos", animeInfos);

module.exports = Animes;
