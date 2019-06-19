var config = require('dotenv');

config.config();
const configuration = Object.freeze({
  MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/mydb',
  NODE_ENV: process.env.NODE_ENV,
  Port: process.env.PORT || 9006,
});

module.exports = configuration ;
