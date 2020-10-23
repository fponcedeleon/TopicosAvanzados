const User = require("../../models/user");
const helper = require("./helper");
const sessionHelper = require("../../helpers/sessions");
/**
 *
 * @param {*} params this is accessed via api and the sport is the name, so we need to query.
 */
const getUserById = async ({ params }) => {
  return await User.findById(params.id)
    .populate("username", ["email"])
    .exec()
    .then((results) => {
      return results;
    })
    .catch((error) => {
      return { status: "Error", message: error.message };
    });
};

const getAll = async () => {
  return await User.find({});
};

const create = async ({ payload, auth }) => {
  const userToInsert = await helper.getUserModel(payload, auth);
  return await userToInsert
    .save()
    .then((result) => {
      const token = sessionHelper.createJWT(result.username);
      return {
        status: "Success",
        data: helper.parseUser(result),
        token: token,
      };
    })
    .catch((error) => {
      return { status: "Error", message: error };
    });
};

const update = async ({ params, payload }) => {
  return await User.updateOne({ _id: params.id }, { $set: payload })
    .exec()
    .then((result) => {
      if (result) {
        return { status: "Success" };
      }

      return { status: "Success", message: "An error occured" };
    })
    .catch((error) => {
      return { status: "Success", message: error };
    });
};

const deleteOne = async ({ params }) => {
  return User.deleteOne({ _id: params.id })
    .exec()
    .then((result) => {
      if (result) {
        return { status: "Success" };
      }

      return { status: "Error", message: "An error occured" };
    })
    .catch((error) => {
      return { status: "Error", message: error };
    });
};

module.exports = {
  getUserById,
  getAll,
  create,
  update,
  deleteOne,
};
