const Token = require("../../models/tokenLink");
const helper = require("./helper");
/**
 *
 * @param {*} params this is accessed via api and the sport is the name, so we need to query.
 */
const getToken = async ({ params }) => {
  return await Token.find({ token: params.token })
    .populate("TokenId", ["name"])
    .exec()
    .then((results) => {
      return results;
    })
    .catch((error) => {
      return { status: "Error", message: error.message };
    });
};

const create = async ({ payload, auth }) => {
  console.log(payload);
  const tokenToInsert = await helper.getTokenModel(payload, auth);
  return await tokenToInsert
    .save()
    .then((result) => {
      return {
        status: "Success",
        data: helper.parseToken(result),
      };
    })
    .catch((error) => {
      return { status: "Error", message: error };
    });
};

const deleteOne = async ({ params }) => {
  return Token.deleteOne({ _id: params.id })
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
  getToken,
  create,
  deleteOne,
};
