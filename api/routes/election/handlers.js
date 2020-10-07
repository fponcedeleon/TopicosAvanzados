const Election = require('../../models/election');
const helper = require('./helper');
/**
 * 
 * @param {*} params this is accessed via api and the sport is the name, so we need to query. 
 */
const getElectionById = async ({ query }) => {

  return await Election.find(params)
    .populate('createdBy', ['email', 'username'])
    .exec()
    .then(results => {
      return results;
    })
    .catch(error => {
      return { status: 'Error', message: error.message };
    });
};

const create = async ({ payload, auth }) => {
  const electionToInsert = await helper.getElectionModel(payload, auth);
  return await electionToInsert.save()
    .then(result => {
      return {
        status: 'Success',
        data: helper.parseElection(result)
      };
    })
    .catch(error => {
      return { status: 'Error', message: error };
    });
};


const update = async ({ params, payload }) => {
  return await Election.updateOne({ _id: params.id }, { $set: payload })
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
  return Election.deleteOne({ _id: params.id })
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
  getElectionById,
  create,
  update,
  deleteOne,
};