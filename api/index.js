if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const Hapi = require('@hapi/hapi');
const routes = require('./routes');
const jwtAuth = require('./auth/jwt');
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

  await createUser();

  await server.register([connectors, jwtAuth, routes]);

  await server.start();
};

const User = require('./models/user');
const createUser = () => {
  const user = new User({
    username: 'test',
    password: 'psw',
    firstName: 'test',
    lastName: 'test',
    isActive: true,
  });

  User.findOne({username: 'test'}).then((re) => console.log('success'+ re)).catch(error=>console.log(error));


}


init();