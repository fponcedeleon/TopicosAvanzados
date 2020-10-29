const handlers = require('./handlers');
// const validations = require('./validations');

module.exports = {
  getToken: {
    auth: false,
    handler: handlers.getToken
  },
  create: {
    auth: process.env.JWT_PROTOCOL,
    handler: handlers.create
  },
  deleteOne: {
    auth: process.env.JWT_PROTOCOL,
    handler: handlers.deleteOne
  },
};