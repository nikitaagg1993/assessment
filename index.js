var configuration = require('./server/config/configuration');
var  Server = require('./server');
const server = new Server(configuration);
server.bootstrap().run();
