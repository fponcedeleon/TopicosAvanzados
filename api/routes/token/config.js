const handlers = require('./handlers');
// const validations = require('./validations');

module.exports = {
  getToken: {
    //auth: false,
    // validate: validations.getByCriteria,
    handler: handlers.getToken
  },
  create: {
    // auth: process.env.JWT_PROTOCOL,
    // validate: validations.create,
    handler: handlers.create
  },
  deleteOne: {
    //auth: process.env.JWT_PROTOCOL,
    // validate: validations.deleteOne,
    handler: handlers.deleteOne
  },
};