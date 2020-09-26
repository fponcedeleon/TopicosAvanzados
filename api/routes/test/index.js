const config = require('./config');

module.exports = [
  {
    method: 'GET',
    path: '/test',
    config: config.test,
  },
];
