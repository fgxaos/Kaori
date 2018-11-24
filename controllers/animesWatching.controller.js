/* eslint linebreak-style: ["error", "windows"] */

const express = require("express");
const getNextEp = require("../utils/nextEpSee");
const getInfo = require("../utils/animeExtractInfo");
const updateWatchProgress = require("../utils/animeUpdateWatchProgress");
const getEpiNames = require("../utils/epiNames");
const transferWToS = require("../utils/transferWatchingToSeen");
const checkEx = require("../utils/checkExistence");


const AnimeWatching = require("../models/animeWatching");
const AnimeSeen = require("../models/animeSeen");



const startNew = (req, res) => {
  // On reconstitue d'abord l'URI de la page
  const numUrl = encodeURIComponent(req.params.numberUrl);
  const endingUrl = encodeURIComponent(req.params.endUrl);
  const uri = `https://myanimelist.net/anime/${numUrl}/${endingUrl}`;

  checkEx(uri)
    .then(alreadyExists => {
      if (alreadyExists) {
        res.send("L'anime est déjà dans la base de données");
      } else {
        getInfo(uri).then(animeInfos => {
          const newAnime = new AnimeWatching({
            ...animeInfos,
            episodeSeen: new Array(animeInfos.numepisodes).fill(false),
            premiered: new Date(animeInfos.premiered),
            finished: false,
            completed: false,
            animeURL: uri,
            numberURL: numUrl,
            endingURL: endingUrl
          });

          AnimeWatching.create(newAnime, (err, results) => {
            if (err) throw err;
            else {
              res.json(results);
            }
          });
        });
      }
    })
    .catch(err => {
      console.error(err);
    });
};

const showWatching = (req, res) => {
  AnimeWatching.find({}, (err, anime) => {
    if (err) throw err;
    // On affiche les animes vus
    /*
    for (let i = 0; i < anime.length; i++) {
      anime[i].nextEpSee = getNextEp(anime[i]);
    }
    */

    let listAnimes = [];

    for (var key in anime) {
      let specsAnime = {
        episodeSeen: anime[key]["episodeSeen"],
        _id: anime[key]["_id"],
        title: anime[key]["title"],
        japanese: anime[key]["japanese"],
        picture: anime[key]["picture"],
        synopsis: anime[key]["synopsis"],
        numepisodes: anime[key]["numepisodes"],
        premiered: anime[key]["premiered"],
        status: anime[key]["status"],
        studios: anime[key]["studios"],
        genres: anime[key]["genres"],
        rating: anime[key]["rating"],
        score: anime[key]["score"],
        ranked: anime[key]["ranked"],
        popularity: anime[key]["popularity"],
        persoScore: anime[key]["persoScore"],
        finished: anime[key]["finished"],
        completed: anime[key]["completed"],
        animeURL: anime[key]["animeURL"],
        numberURL: anime[key]["numberURL"],
        endingURL: anime[key]["endingURL"],
        __v: anime[key]["__v"]
      };

      listAnimes.push(specsAnime);

    }
    res.json(listAnimes);
  });
  /*
  if (process.env.NODE_ENV === "production") {
    // Serve any static files
    app.use(express.static(path.join(__dirname, "client/build")));
    // Handle React routing, return all requests to React app
    app.get("*", function(req, res) {
      res.sendFile(path.join(__dirname, "client/build", "index.html"));
    });
  } */
};

const detailsAnime = (req, res) => {
  const id = req.params.animeID;

  AnimeWatching.findById(id, (err, anime) => {
    if (err) throw err;

    // On récupère le nom des épisodes
    const numEpisodes = anime.numepisodes;
    const urlEpisodes = `${anime.animeURL}/episode`;

    getEpiNames(urlEpisodes, numEpisodes).then(animeNames => {
      // On vérifie si la série est vue intégralement ou non
      anime.completed = getNextEp(anime) === "Completed";
      res.render("animeDetails", {
        animeInfos: anime,
        listNames: JSON.parse(animeNames)
      });
    });
  });
};

const changeDetailsAnime = (req, res) => {
  const id = req.params.animeID;

  const newListEpisodeSeen = req.body.listProgress;

  AnimeWatching.findById(id, (err, anime) => {
    if (err) throw err;

    //anime.episodeSeen = updateWatchProgress(anime, req.body);
    AnimeWatching.findOneAndUpdate(
      { _id: id },
      { $set: { episodeSeen: newListEpisodeSeen } },
      (err, res) => {
        if (err) throw err;
      }
    );
    /*
    if (getNextEp(anime) === "Completed") {
      AnimeWatching.findOneAndUpdate(
        { _id: id },
        { $set: { Completed: true } },
        (err, res) => {
          if (err) throw err;
          showWatching();
        }
      );
    }*/
  });
};

const completeEpisodeSeen = (req, res) => {};

const stopWatching = (req, res) => {
  AnimeWatching.findOneAndRemove({ _id: req.params.id }, (err, anime) => {
    if (err) throw err;

    res.send("Success");
  });
};

const sendSeen = (req, res) => {
  const id = req.params.animeID;
  AnimeWatching.findOneAndRemove(id, (err, anime) => {
    if (err) throw err;
    transferWToS(anime);
    res.send('Success');
  });
};

const removeWatching = (req, res) => {
  const id = req.params.animeID;
  AnimeWatching.findOneAndRemove(id, (err, anime) => {
    if(err) throw err;
    res.send("Success");
  });
};

module.exports = {
  startNew,
  showWatching,
  detailsAnime,
  changeDetailsAnime,
  completeEpisodeSeen,
  stopWatching,
  sendSeen,
  removeWatching
};
