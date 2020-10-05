const Proposal = require("../../models/proposal");

const getProposalModel = async (
  { electionId, name, description },
  { credentials }
) => {
  return new Proposal({
    electionId: electionId,
    name: name,
    description: description,
  });
};

const parseProposal = ({ _id, name, description, electionId }) => {
  return {
    id: _id || undefined,
    name: name,
    electionId: electionId,
    description: description,
  };
};

module.exports = {
  getProposalModel,
  parseProposal,
};
