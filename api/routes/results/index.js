const config = require("./config");

module.exports = [
  {
    method: "GET",
    path: "/results/{id}",
    config: config.getResultsById,
  },
];
