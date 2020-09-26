const test = require('./test');
module.exports = {
    name: 'routes',
    register: server => {
      return server.route([
        ...test,
      ]);
    },
  };