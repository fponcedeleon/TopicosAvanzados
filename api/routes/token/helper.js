const Token = require("../../models/tokenLink");
const crypto = require("crypto");

const getTokenModel = async ({ electionId, userId }, { credentials }) => {
  const token = crypto.randomBytes(20).toString("hex");
  return new Token({
    electionId: electionId,
    userId: userId,
    token: token,
  });
};

const parseToken = ({ _id, electionId, userId, token }) => {
  return {
    id: _id || undefined,
    userId: userId,
    electionId: electionId,
    token: token,
  };
};

module.exports = {
  getTokenModel,
  parseToken,
};
