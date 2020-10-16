const handlers = require('./handlers');
// const validations = require('./validations');

module.exports = {
  getResultsById: {
    //auth: false,
    // validate: validations.getByCriteria,
    // description: 'Returns a list of activities. No required query params, but if given, will filter the search',
    handler: handlers.getResultsById
  },
};