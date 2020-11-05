const userHelper = require('../users');
const jwt = require('jsonwebtoken');

const getExistingUserByUsername = async ({ screen_name }) => {
  return await userHelper.getUserByParams({ email: screen_name });
}

const createUser = async ({ screen_name }) => {
  const payloadObj = {
    payload: {
      email: screen_name
    }
  };

  const userModel = userHelper.createUserModel(payloadObj);
  const createdUser = await userHelper.saveUser(userModel);
  const parsedUser = userHelper.parseUserInfo(createdUser, false);
  return parsedUser;

}

const createJWT = email => {
  return jwt.sign({ sub: email }, process.env.JWT_SECRET);
}

const create = async (email, password) => {

  const validatedUser = await userHelper.comparePassword(email, password);
  return validatedUser ? createJWT(email) : null;
};

module.exports = {
  getExistingUserByUsername,
  createUser,
  createJWT,
  create,
}