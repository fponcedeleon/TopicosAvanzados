const Proposal = require('../../models/proposal');
const helper = require('./helper');
/**
 * 
 * @param {*} params this is accessed via api and the sport is the name, so we need to query. 
 */
const getProposalById = async ({ params }) => {

  return await Proposal.findById(params.id)
    .populate('proposalId', ['name'])
    .exec()
    .then(results => {
      return results;
    })
    .catch(error => {
      return { status: 'Error', message: error.message };
    });
};

const create = async ({ payload, auth }) => {
  const proposalToInsert = await helper.getProposalModel(payload, auth);
  return await proposalToInsert.save()
    .then(result => {
      return {
        status: 'Success',
        data: helper.parseProposal(result)
      };
    })
    .catch(error => {
      return { status: 'Error', message: error };
    });
};


const update = async ({ params, payload }) => {
  return await Proposal.updateOne({ _id: params.id }, { $set: payload })
    .exec()
    .then(result => {
      if (result) {
        return { status: 'Success' };
      }

      return { status: 'Success', message: 'An error occured' };
    })
    .catch(error => {
      return { status: 'Success', message: error };
    });
};

const deleteOne = async ({ params }) => {
  return Proposal.deleteOne({ _id: params.id })
    .exec()
    .then(result => {
      if (result) {
        return { status: 'Success' };
      }

      return { status: 'Error', message: 'An error occured' };
    })
    .catch(error => {
      return { status: 'Error', message: error };
    });
};

module.exports = {
  getProposalById,
  create,
  update,
  deleteOne,
};
