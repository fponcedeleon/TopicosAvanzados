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
    path: '/users/validate',
    config: config.validateUser,
  },
];
