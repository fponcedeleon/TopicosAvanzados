const Proposal = require("../../models/proposal");
const Election = require("../../models/election");
const Option = require("../../models/option");
const helper = require("./helper");
/**
 *
 * @param {*} params this is accessed via api and the sport is the name, so we need to query.
 */
const getResultsById = async ({ params }) => {
  const election = await Election.findById(params.id);
  const proposals = await Proposal.find({ electionId: election._id });
  const proposalIds = proposals.map(prop => prop._id);
  const options = await Option.find({ proposalId: { $in: proposalIds } })

  return helper.getResults(options);
};

module.exports = {
  getResultsById,
};
