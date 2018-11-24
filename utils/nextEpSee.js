/*eslint-disable*/
const nextEpSee = anime => {
  let listEp = anime.episodeSeen;
  let numEpisodes = anime.numepisodes;

  let i = 0;
  while (i < numEpisodes && listEp[i] === true) {
    i = i + 1;
  }
  if (i === 0) {
    return 1;
  }
  if (i === numEpisodes) {
    return "Completed";
  } else {
    return i + 1;
  }
};
module.exports = nextEpSee;
