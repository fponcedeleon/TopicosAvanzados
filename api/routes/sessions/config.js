const handlers = require('./handlers');

module.exports = {
  create: {
    description: 'Given the user credentials, returns the user and a token that represents it',
    handler: async (req, res) => {
      return await handlers.create(req.payload);
    },
  },
};
