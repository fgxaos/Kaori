/* eslint-disable */
const fs = require("fs");
const request = require("request-promise-native");
const cheerio = require("cheerio");

const stringifyNode = require("../utils/stringifyNodes");
const isNotNull = require("../utils/nullTest");

const getInfo = uri => {
  const options = {
    uri,
    transform(body) {
      return cheerio.load(body);
    }
  };

  return request(options)
    .then($ => {
      const json = {
        title: "",
        japanese: "",
        picture: "",
        synopsis: "",
        numepisodes: 0,
        episodeSeen: new Array(24).fill(false),
        premiered: "",
        status: "",
        studios: "",
        genres: "",
        rating: "",
        score: "",
        ranked: "",
        popularity: "",
        persoScore: 0,
        finished: false
      };

      json.title = $('span[itemprop="name"]').html();
      json.japanese = stringifyNode($("div.spaceit_pad").eq(2), "Japanese: ");
      json.picture = $("img.ac").attr("src");
      json.synopsis = stringifyNode($('span[itemprop="description"]'));
      json.numepisodes = stringifyNode(
        $("div.spaceit").eq(0),
        "Episodes:",
        undefined,
        undefined,
        true
      );

      const listOfNodes = $("div.js-scrollfix-bottom").children();
      json.premiered = stringifyNode(listOfNodes.eq(16), "Premiered:");
      json.status = stringifyNode(listOfNodes.eq(14), "Status:");
      json.studios = stringifyNode(listOfNodes.eq(20), "Studios:");
      json.genres = stringifyNode(listOfNodes.eq(22), "Genres:");
      json.rating = stringifyNode(listOfNodes.eq(24), "Rating:");
      json.score = $('span[itemprop="ratingValue"]').text();
      /* json.ranked = parseInt(
        stringifyNode($('div.spaceit.po-r.js-statistics-info.di-ib'), 'Ranked: #').split(' ')[0],
        10,
      );
      */

      json.ranked = stringifyNode(
        $("div.spaceit.po-r.js-statistics-info.di-ib"),
        "#",
        "",
        2,
        true
      );
      json.popularity = stringifyNode(listOfNodes.eq(29), 'Popularity: #');
      

      return new Promise((resolve, reject) => {
        fs.writeFile("output.json", JSON.stringify(json, null, 4), err => {
          if (err) {
            reject(err);
            return;
          }
          console.log("File successfully written!");
          resolve(json);
        });
      });
    })
    .catch(err => {
      console.error(err);
      // res.status(404);
      // res.send(err.message);
    });
};

module.exports = getInfo;
