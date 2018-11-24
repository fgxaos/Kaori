const Anime = require("../models/animeModel");

module.exports = app => {
  app.get("/api/setupAnime", (req, res) => {
    // ToDo: seed database
    console.log("Started !");
    const starterAnimes = [
      {
        title: "Fate/stay night",
        japanese: "Fate/stay night",
        picture: "https://myanimelist.cdn-dena.com/images/anime/4/30327.jpg",
        synopsis:
          "After a mysterious inferno kills his family, Shirou is saved and adopted by Kiritsugu Emiya, who teaches him the ways of magic and justice.",
        numEpisodes: Number(24),
        // ToDo: Attention, il faudra remplacer 'Number(24)'
        // ci-dessous par la valeur de 'numEpisodes' (le faire automatiquement)
        episodeSeen: new Array(24).fill(false),
        premiered: "Winter 2006",
        status: "Finished Airing",
        studios: "Studio Deen",
        genres: "Action, Supernatural, Magic, Romance, Fantasy",
        rating: "R -17 + (violence & profanity)",
        score: 7.53,
        ranked: 1519,
        popularity: 80,
        persoScore: 7.5,
        finished: true
      }
    ];
    console.log("Finished !");
    Anime.create(starterAnimes, (err, results) => {
      res.send(results);
    });
  });
};
