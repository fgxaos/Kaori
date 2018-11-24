/*eslint-disable*/
const fs = require("fs");
const request = require("request-promise-native");
const cheerio = require("cheerio");

const getEpisodeNames = (uri, numEpisodes) => {
  const options = {
    uri,
    transform(body) {
      return cheerio.load(body);
    }
  };

  return request(options)
    .then($ => {
      const episodeNames = [];

      for (let i = 0; i < numEpisodes; i++) {
        const nameEpisode = $("tr.episode-list-data")
          .eq(i)
          .children("td.episode-title")
          .text()
          .split("\n")[0];

        episodeNames.push(nameEpisode);
      }
      return new Promise((resolve, reject) => {
        fs.writeFile(
          "output.json",
          JSON.stringify(episodeNames, null, 4),
          err => {
            if (err) {
              reject(err);
              return;
            }
            resolve(JSON.stringify(episodeNames));
          }
        );
      });
    })
    .catch(err => {
      console.error(err);
    });
};

module.exports = getEpisodeNames;
