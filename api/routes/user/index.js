const config = require('./config');

module.exports = [
  {
    method: 'GET',
    path: '/users/{id}',
    config: config.getUserById,
  },
  {
    method: 'GET',
    path: '/users',
    config: config.getAll,
  },
  {
    method: 'GET',
    path: '/users/votants',
    config: config.getFilteredUsers,
  },
  {
    method: 'POST',
    path: '/users',
    config: config.create,
  },
  {
    method: 'PUT',
    path: '/users/{id}',
    config: config.update,
  },
  {
    method: 'DELETE',
    path: '/users/{id}',
    config: config.deleteOne,
  },
  {
    method: 'POST',
    path: '/users/validate/{id}',
    config: config.validateUser,
  },
  {
    method: 'POST',
    path: '/users/current',
    config: config.current,
  },
];
