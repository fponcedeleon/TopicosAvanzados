const http = require('http');
const Hapi = require('@hapi/hapi');
const routes = require('./routes');

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

  await server.register([routes]);


  await server.start();
};
init();