const User = require("../../models/user");
const helper = require("./helper");
const sessionHelper = require("../../helpers/sessions");
const { validateUserEmail } = require("../../email");

const linkUrl =
  process.env.NODE_ENV === "localhost"
    ? "http://localhost:3000"
    : process.env.ENVIRONMENT === "test"
    ? "https://topicos2020testing.netlify.app"
    : "https://topicos2020.netlify.app";

/**
 *
 * @param {*} params this is accessed via api and the sport is the name, so we need to query.
 */
const getUserById = async ({ params }) => {
  return await User.findById(params.id);
};

const getAll = async () => {
  return await User.find({});
};

const getFilteredUsers = async ({ query }) => {
  const filter = {};
  if (query.minAge && query.maxAge) {
    filter.age = { $gte: query.minAge, $lte: query.maxAge };
  } else if (query.maxAge) {
    filter.age = { $lte: query.maxAge };
  } else if (query.minAge) {
    filter.age = { $gte: query.minAge };
  }
  if (query.city) filter.city = { $regex: query.city, $options: "i" };
  if (query.department)
    filter.department = { $regex: query.department, $options: "i" };
  return await User.find(filter);
};

const getUserByEmail = async ({ params }) => {
  return await User.findOne({ email: params.email });
};

const create = async ({ payload, auth }) => {
  const userToInsert = await helper.getUserModel(payload, auth);
  return await userToInsert
    .save()
    .then((result) => {
      const link = `${linkUrl}/verify/${result._id}`;
      const subject = "Verify your email address";
      validateUserEmail(result.username, result.email, link, subject);
      return {
        status: "Success",
        data: helper.parseUser(result),
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

const validateUser = async ({ params }) => {
  return await User.findOneAndUpdate({ _id: params.id }, { validated: true })
    .exec()
    .then((result) => {
      if (result) {
        const token = sessionHelper.createJWT(result.username);
        return { status: "Success", token: token };
      }
      return { status: "Error" };
    })
    .catch((error) => {
      return { status: "Success", message: error };
    });
};

const resetPassword = async ({ params, payload }) => {
  const { password } = payload;
  const userToUpdate = await User.updateOne(
    { _id: params.id },
    { password: password }
  );
  return userToUpdate;
};

const current = ({ auth }) => {
  return { status: "Success", credentials: auth.credentials };
};

module.exports = {
  getUserById,
  getAll,
  getFilteredUsers,
  getUserByEmail,
  create,
  update,
  deleteOne,
  validateUser,
  current,
  resetPassword,
};
