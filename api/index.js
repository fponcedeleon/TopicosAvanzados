const http = require('http');
const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || '8080',
    host: process.env.HOST || '0.0.0.0',
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

  console.log(`listening on port ${server.port} and host ${server.host}`)
  await server.register([routes]);


  await server.start();
};

init();