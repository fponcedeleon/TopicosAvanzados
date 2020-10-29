const config = require("./config");

module.exports = [
  {
    method: "GET",
    path: "/token/{token}",
    config: config.getToken,
  },
  {
    method: "POST",
    path: "/token",
    config: config.create,
  },
  {
    method: "POST",
    path: "/token/{id}",
    config: config.deleteOne,
  },
];
