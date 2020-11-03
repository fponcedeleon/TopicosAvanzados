const handlers = require('./handlers');
// const validations = require('./validations');

module.exports = {
  getToken: {
    auth: false,
    handler: handlers.getToken
  },
  create: {
    handler: handlers.create
  },
  deleteOne: {
    handler: handlers.deleteOne
  },
};