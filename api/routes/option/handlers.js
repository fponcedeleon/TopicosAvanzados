const Option = require('../../models/option');
const helper = require('./helper');
/**
 * 
 * @param {*} params this is accessed via api and the sport is the name, so we need to query. 
 */
const getOptionById = async ({ query }) => {

  return await Option.find(params)
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
  const electionToInsert = await helper.getOptionModel(payload, auth);
  return await electionToInsert.save()
    .then(result => {
      return {
        status: 'Success',
        data: helper.parseOption(result)
      };
    })
    .catch(error => {
      return { status: 'Error', message: error };
    });
};


const update = async ({ params, payload }) => {
  return await Option.updateOne({ _id: params.id }, { $set: payload })
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
  return Option.deleteOne({ _id: params.id })
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
  getOptionById,
  create,
  update,
  deleteOne,
};
