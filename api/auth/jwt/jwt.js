const jwt2 = require('hapi-auth-jwt2');
const usersHandler = require('../../helpers/users');

const validate = async (decoded, request) => {
  const username = decoded.sub;

  // eslint-disable-next-line no-use-before-define
  const user = await usersHandler.getUserByParams({ username });
  if (user.isActive) {
    return { isValid: true, credentials: user };
  }

  return { isValid: false };
};

module.exports = async server => {
  await server.register(jwt2);
  server.auth.strategy('jwt', 'jwt', { key: process.env.JWT_SECRET, validate });
};
