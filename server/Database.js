
var MongoClient = require('mongodb').MongoClient;
class Database {
 static open(mongoUrl) {
    return new Promise((resolve, reject) => {
      MongoClient
        .connect(
          mongoUrl,
          { useNewUrlParser: true },
        )
        .then((result) => {resolve(result); })
        .catch((err) => reject(err));
    });
  }
   static disconnect() {
    MongoClient.disconnect();
  }
}

module.exports = Database;
