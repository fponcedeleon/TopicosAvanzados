const handlers = require('./handlers');

module.exports = {
  test: {
    auth: false,
    description: 'A Test',
    handler: handlers.test
  },
};