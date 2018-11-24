/* eslint linebreak-style: ["error", "windows"] */

const transferSToW = require("../utils/transferSeenToWatching");
const getEpiNames = require("../utils/epiNames");

const AnimeSeen = require("../models/animeSeen");

const startNew = (req, res) => {
  // On commence par créer l'anime que l'on commence à regarder
  const newAnime = new AnimeSeen({
    title: req.body.title,
    japanese: req.body.japanese,
    picture: req.body.picture,
    synopsis: req.body.synopsis,
    nEpisodes: req.body.nEpisodes,
    episodeSeen: Array(...Array(req.body.nEpisodes)).map(
      Number.prototype.valueOf,
      false
    ),
    premiered: new Date(req.body.premiered),
    status: req.body.status,
    studios: req.body.studios,
    genres: req.body.genres,
    rating: req.body.rating,
    score: req.body.score,
    ranked: req.body.ranked,
    popularity: req.body.popularity,
    persoScore: req.body.persoScore,
    finished: false
  });

  AnimeSeen.create(newAnime, (err, results) => {
    if (err) throw err;
    else {
      console.log("Success !");
    }
  });
};

const showSeen = (req, res) => {
  AnimeSeen.find({}, (err, anime) => {
    if (err) throw err;
    // On affiche les animes en cours
    // res.render("displaySeen", { animeWatch: anime });

    // On envoie les résultats vers le front
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
        __v: anime[key]["__v"]
      };
      listAnimes.push(specsAnime);
    }
    res.json(listAnimes);
  });
  // The following is probably useless, test without it
  if (process.env.NODE_ENV === "production") {
    // Serve any static files
    app.use(express.static(path.join(__dirname, "client/build")));
    // Handle React routing, return all requests to React app
    app.get("*", function(req, res) {
      res.sendFile(path.join(__dirname, "client/build", "index.html"));
    });
  }
};

const detailsAnime = (req, res) => {
  const id = req.params.animeID;

  AnimeSeen.findById(id, (err, anime) => {
    if (err) throw err;

    // On récupère le nom des épisodes
    const numEpisodes = anime.numepisodes;
    const urlEpisodes = `${anime.url}/episode`;

    getEpiNames(urlEpisodes, numEpisodes).then(animeNames => {
      res.render("animeDetailsSeen", {
        animeInfos: anime,
        listNames: JSON.parse(animeNames)
      });
    });
  });
};

const sendBackToWatching = (req, res) => {
  const id = req.params.animeID;
  AnimeSeen.findOneAndDelete(id, (err, anime) => {
    if (err) throw err;
    transferSToW(anime);
    res.send('Success!');
  });
};

const removeSeen = (req, res) => {
  AnimeSeen.findOneAndDelete({ _id: req.params.id }, (err, anime) => {
    if (err) throw err;
    res.send("Success");
  });
};

module.exports = {
  startNew,
  showSeen,
  detailsAnime,
  removeSeen,
  sendBackToWatching
  // drop
};
