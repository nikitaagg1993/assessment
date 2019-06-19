var express = require('express')
var bodyParser = require('body-parser')
var Database = require('./server/Database.js');
var register = require('./server/register')
var login = require('./server/login')

class Server {
  constructor(config) {
    this.config = config;
    this.app = express();
  }
 bootstrap() {
    this.initBodyParser();
    this.setupRoutes();
    return this;
  }
   setupRoutes() {
    const {
      app,
      config: {  MONGO_URL },
    } = this;
    app.post('/register', function (req, res) {
      register(req,res,MONGO_URL);
      res.send('Registered')
    })
    app.post('/login', function (req, res) {
      login(req,res,MONGO_URL);
      // res.send('Registered')
    })
    // app.use(notFoundRoute);
    // app.use(errorHandler);
  }
  run() {
    const {
      app,
      config: { Port, MONGO_URL },
    } = this;
    Database.open(MONGO_URL)
      .then((result) => {
        console.log('Conected');
        app.listen(Port, (err) => {
          if (err) { throw err; }
          console.log('app is running at', Port);
        });
      })
      .catch((err) => {
        console.log('Error Occurred');
      });
  }
   initBodyParser() {
    const { app } = this;
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    return this;
  }
}
module.exports =  Server ;
