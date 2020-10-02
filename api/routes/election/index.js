const config = require('./config');

module.exports = [
  {
    method: 'GET',
    path: '/elections/{id}',
    config: config.getElectionById,
  },
  {
    method: 'POST',
    path: '/elections',
    config: config.create,
  },
  {
    method: 'PUT',
    path: '/elections/{id}',
    config: config.update,
  },
  {
    method: 'DELETE',
    path: '/elections/{id}',
    config: config.deleteOne,
  },
];
