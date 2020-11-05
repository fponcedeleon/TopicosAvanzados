if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const Hapi = require('@hapi/hapi');
const routes = require('./routes');
const jwtAuth = require('./auth/jwt');
const connectors = require('./connectors');
const { task } = require('./helpers/schedule');

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {origin: ['*'], credentials: true}
    }
  });
  const cors = {
    plugin: require('hapi-cors'),
    options: {
        origins: ['*']
    }
  };

  task.task();
  await server.register([cors, connectors, jwtAuth, routes]);
  await server.start();
};

init();