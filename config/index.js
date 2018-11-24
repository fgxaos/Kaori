const configValues = require('./config');

module.exports = {

  getDbConnectionString() {
    return `mongodb://${configValues.uname}:${configValues.pwd}@ds127506.mlab.com:27506/myanimulist`;
  },

};

