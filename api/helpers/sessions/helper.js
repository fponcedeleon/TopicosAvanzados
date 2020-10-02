const userHelper = require('../users');
const jwt = require('jsonwebtoken');

const getExistingUserByUsername = async ({ screen_name }) => {
  return await userHelper.getUserByParams({ username: screen_name });
}

const createUser = async ({ screen_name }) => {
  const payloadObj = {
    payload: {
      username: screen_name
    }
  };

  const userModel = userHelper.createUserModel(payloadObj);
  const createdUser = await userHelper.saveUser(userModel);
  const parsedUser = userHelper.parseUserInfo(createdUser, false);
  return parsedUser;

}

const createJWT = username => {
  return jwt.sign({ sub: username }, process.env.JWT_SECRET);
}

module.exports = {
  getExistingUserByUsername,
  createUser,
  createJWT
}