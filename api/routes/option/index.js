const config = require('./config');

module.exports = [
  {
    method: 'GET',
    path: '/options/{id}',
    config: config.getOptionById,
  },
  {
    method: 'POST',
    path: '/options',
    config: config.create,
  },
  {
    method: 'PUT',
    path: '/options/{id}',
    config: config.update,
  },
  {
    method: 'DELETE',
    path: '/options/{id}',
    config: config.deleteOne,
  },
];
