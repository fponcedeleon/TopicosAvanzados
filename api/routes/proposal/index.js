const config = require("./config");

module.exports = [
  {
    method: "GET",
    path: "/proposals/{id}",
    config: config.getProposalById,
  },
  {
    method: 'GET',
    path: '/proposals/byElection/',
    config: config.getProposalsByElection,
  },
  {
    method: "POST",
    path: "/proposals",
    config: config.create,
  },
  {
    method: "PUT",
    path: "/proposals/{id}",
    config: config.update,
  },
  {
    method: "DELETE",
    path: "/proposals/{id}",
    config: config.deleteOne,
  },
];
