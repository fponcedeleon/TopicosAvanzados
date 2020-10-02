const test = require('./test');
const election = require('./election');
const option = require('./option');

module.exports = {
    name: 'routes',
    register: server => {
      return server.route([
        ...test,
        ...election,
        ...option,
      ]);
    },
  };