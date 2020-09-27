if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const http = require('http');
const Hapi = require('@hapi/hapi');
const routes = require('./routes');
const connectors = require('./connectors');

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {origin: ['*'], credentials: true}
    }
  });
  const cors = {
    //plugin: require('hapi-cors'),
    options: {
        origins: ['*']
    }
  };

  await server.register([connectors, routes]);

  await server.start();
};

init();