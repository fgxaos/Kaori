/* eslint-disable */
const mongoose = require("mongoose");

const animeWatchingInfos = new mongoose.Schema({
  animeURL: String,
  title: String,
  japanese: String,
  picture: String,
  synopsis: String,
  numepisodes: Number,
  episodeSeen: Array,
  lastEpSeen: String,
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
  numberURL: String,
  endingURL: String
});

const AnimesWatching = mongoose.model("watching", animeWatchingInfos);

module.exports = AnimesWatching;
