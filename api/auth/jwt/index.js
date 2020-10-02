const register = async server => {
  // eslint-disable-next-line global-require
  await require('./jwt')(server);
};

module.exports = {
  name: 'auth',
  register,
};
