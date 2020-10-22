const User = require("../../models/user");

const getUserModel = async (
  { username, password, email, firstName, lastName, isActive, role },
  { credentials }
) => {
  return new User({
    username: username,
    password: password,
    email: email,
    firstName: firstName,
    lastName: lastName,
    isActive: isActive,
    role: role,
  });
};

const parseUser = ({
  _id,
  username,
  password,
  email,
  firstName,
  lastName,
  isActive,
  role,
}) => {
  return {
    id: _id || undefined,
    username: username,
    password: password,
    email: email,
    firstName: firstName,
    lastName: lastName,
    isActive: isActive,
    role: role,
  };
};

module.exports = {
  getUserModel,
  parseUser,
};
