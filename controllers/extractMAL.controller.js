const request = require("request-promise-native");
const cheerio = require("cheerio");

const stringifyNode = require("../utils/stringifyNodes");
const isNotNull = require("../utils/nullTest");
const separateUrl = require("../utils/separateURL");
const getInfo = require("../utils/animeExtractInfo");

const search = (req, res) => {
  res.render("search");
};

const searchAnimes = (req, res) => {
  const url = `https://myanimelist.net/search/all?q=${encodeURIComponent(
    //req.body.searchText
    req.params.searchValue
  )}`;

  const options = {
    uri: url,
    transform(body) {
      return cheerio.load(body);
    }
  };
  request(options)
    .then($ => {
      const list = $("div.list.di-t.w100")
        .map(async i => {
          if (
            $("a.hoverinfo_trigger.fw-b.fl-l")
              .eq(i)
              .attr("href") == null
          ) {
            return null;
          }

          
          const animeItem = {
            animeURL: "",
            title: "",
            japanese: "",
            picture: "",
            synopsis: "",
            numepisodes: 0,
            premiered: "",
            status: "",
            studios: "",
            genres: "", 
            rating: "", 
            ranked: 0,
            popularity: "",
            nature: "",
            score: 0,
            numberURL: "",
            endingURL: ""
          };
          
          animeItem.animeURL = $("a.hoverinfo_trigger.fw-b.fl-l")
            .eq(i)
            .attr("href");

          animeItem.numberURL = separateUrl(animeItem.animeURL, 4);
          animeItem.endingURL = separateUrl(animeItem.animeURL, 5);
         
          animeItem.title = stringifyNode(
            $("a.hoverinfo_trigger.fw-b.fl-l").eq(i)
          ); 
          animeItem.nature = stringifyNode(
            $("div.pt8.fs10.lh14.fn-grey4").eq(i),
            "",
            1
          );
          animeItem.score = stringifyNode(
            $("div.pt8.fs10.lh14.fn-grey4").eq(i),
            "",
            2
          ).slice(7);

          

          const options2 = {
            uri: animeItem.animeURL,
            transform(body) {
              return cheerio.load(body);
            }
          };

          await request(options2)
            .then($2 => {
              animeItem.picture = $2("img.ac").attr("src");
              animeItem.synopsis = stringifyNode($2('span[itemprop="description"]'));
              animeItem.numepisodes = stringifyNode(
                $2("div.spaceit").eq(0),
                "Episodes:",
                undefined,
                undefined,
                true
              );
              const listOfNodes = $2("div.js-scrollfix-bottom").children();
              animeItem.premiered = stringifyNode(listOfNodes.eq(16), "Premiered:");
              animeItem.status = stringifyNode(listOfNodes.eq(14), "Status:");
              animeItem.studios = stringifyNode(listOfNodes.eq(20), "Studios:");
              animeItem.genres = stringifyNode(listOfNodes.eq(21), "Genres:");
              animeItem.rating = stringifyNode(listOfNodes.eq(24), "Rating:");
              animeItem.ranked = stringifyNode(
                $2("div.spaceit.po-r.js-statistics-info.di-ib"),
                "#",
                "",
                2,
                true
              );
              animeItem.popularity = stringifyNode(listOfNodes.eq(29), 'Popularity: #');
            })
            .catch(err => {
              console.error(err);
            });
          
          return animeItem;
          
        })
        .get();
      return Promise.all(list);
    })
    .then(listAnimeSearch => {
      // On a réussi à récupérer la recherche, on l'affiche avec 'displaySearch'
      const searchResult = listAnimeSearch.filter(Boolean);
      // On retire les elements 'null'
      listAnimeSearch = listAnimeSearch.filter(isNotNull);

      res.json(listAnimeSearch);

      //res.render("displaySearch", { animeSearch: listAnimeSearch });
    })
    .catch(err => {
      console.error(err);
      res.status(404);
      res.send(err.message);
    });
};

const extractEpisodes = (req, res) => {
  const url = `https://myanimelist.net/anime/${encodeURIComponent(req.params.numberURL)}/${encodeURIComponent(
    req.params.endingURL
  )}/episode`;

  const options = {
    uri: url,
    transform(body) {
      return cheerio.load(body);
    }
  };

  request(options)
    .then($ => {
      const listEpisodesRaw = $("a.fl-l.fw-b").map(async i => {
      //const listEpisodesRaw = $("tr.episode-list-data").map(async i => {
          var episodeInfos =  {
            episodeTitle: "", 
            aired: ""
          };

          const options2 = {
            uri: url,
            transform(body) {
              return cheerio.load(body);
            }
          };

          await request(options2)
            .then($2 => {
              episodeInfos.episodeTitle = stringifyNode($2("a.fl-l.fw-b").eq(i));
              episodeInfos.aired = stringifyNode($2("td.episode-aired.nowrap").eq(i));
            })
            .catch(err => {
              console.error(err);
            })    
          
          return episodeInfos;
        })
        .get();
        return Promise.all(listEpisodesRaw);
  
        })
      .then(listEpisodesAnime => {
        res.json(listEpisodesAnime);
      })
      .catch(err => {
        res.status(err);
      });
};

module.exports = {
  searchAnimes,
  search,
  extractEpisodes
};
