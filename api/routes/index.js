const test = require("./test");
const election = require("./election");
const option = require("./option");
const proposal = require("./proposal");
const user = require("./user");

module.exports = {
  name: "routes",
  register: (server) => {
    return server.route([...test, ...election, ...option, ...proposal, ...user]);
  },
};
