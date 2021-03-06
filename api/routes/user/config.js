const handlers = require("./handlers");
// const validations = require('./validations');

module.exports = {
  getUserById: {
    //auth: false,
    // validate: validations.getByCriteria,
    handler: handlers.getUserById,
  },
  getAll: {
    handler: handlers.getAll,
  },
  getFilteredUsers: {
    handler: handlers.getFilteredUsers,
  },
  getUserByEmail: {
    handler: handlers.getUserByEmail,
  },
  create: {
    // auth: process.env.JWT_PROTOCOL,
    // validate: validations.create,
    handler: handlers.create,
  },
  update: {
    //auth: process.env.JWT_PROTOCOL,
    // validate: validations.update,
    handler: handlers.update,
  },
  deleteOne: {
    //auth: process.env.JWT_PROTOCOL,
    // validate: validations.deleteOne,
    handler: handlers.deleteOne,
  },
  validateUser: {
    // auth: process.env.JWT_PROTOCOL,
    // validate: validations.deleteOne,
    handler: handlers.validateUser,
  },
  current: {
    auth: process.env.JWT_PROTOCOL,
    handler: handlers.current,
  },
  resetPassword: {
    handler: handlers.resetPassword,
  },
};
