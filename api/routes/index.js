const election = require("./election");
const option = require("./option");
const proposal = require("./proposal");
const sendMail = require("./sendMail");
const user = require("./user");
const token = require("./token");
const sessions = require("./sessions");

module.exports = {
  name: "routes",
  register: (server) => {
    return server.route([
      ...election,
      ...option,
      ...proposal,
      ...sendMail,
      ...user,
      ...token,
      ...sessions,
    ]);
  },
};
