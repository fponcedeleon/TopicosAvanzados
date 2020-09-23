import test from './test';
module.exports = {
    name: 'routes',
    register: server => {
      return server.route([
        ...test,
      ]);
    },
  };