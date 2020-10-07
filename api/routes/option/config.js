const handlers = require("./handlers");
// const validations = require('./validations');

module.exports = {
  getOptionById: {
    auth: false,
    // validate: validations.getByCriteria,
    // description: 'Returns a list of activities. No required query params, but if given, will filter the search',
    handler: handlers.getOptionById,
  },
  getOptionsByProposal: {
    // validate: validations.getByCriteria,
    // description: 'Returns a list of activities. No required query params, but if given, will filter the search',
    handler: handlers.getOptionsByProposal,
  },
  create: {
    // auth: process.env.JWT_PROTOCOL,
    // validate: validations.create,
    // description: 'Creates and returns an activity. Every param in the model is required',
    handler: handlers.create,
  },
  update: {
    auth: process.env.JWT_PROTOCOL,
    // validate: validations.update,
    // description: 'Updates the activity given the params. The id is required to get the activity to update',
    handler: handlers.update,
  },
  deleteOne: {
    auth: process.env.JWT_PROTOCOL,
    // validate: validations.deleteOne,
    // description: 'Deletes the activity given the (required) id',
    handler: handlers.deleteOne,
  },
};
