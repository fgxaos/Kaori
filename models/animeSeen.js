/* eslint-disable */
const mongoose = require("mongoose");

const animeSeen = new mongoose.Schema({
  url: String,
  title: String,
  japanese: String,
  picture: String,
  synopsis: String,
  numepisodes: Number,
  episodeSeen: Array,
  // lastEpSeen: String,
  premiered: String,
  status: String,
  studios: String,
  genres: String,
  rating: String,
  score: String,
  ranked: String,
  popularity: String,
  persoScore: Number,
  finished: Boolean,
  completed: Boolean,
  endingURL: String,
  numberURL: String
});

const AnimesSeen = mongoose.model("seen", animeSeen);

module.exports = AnimesSeen;
