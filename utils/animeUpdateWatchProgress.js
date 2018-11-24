/*eslint-disable*/
const updateWatchProgress = (anime, listChanges) => {
  let listEp = anime.episodeSeen;

  for (var key in listChanges) {
    if (listChanges[key] === "on") {
      listEp[key] = true;
    } else {
      listEp[key] = false;
    }
  }
  return listEp;
};
module.exports = updateWatchProgress;
