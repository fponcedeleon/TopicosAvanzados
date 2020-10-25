const User = require("../../models/user");

const getUserModel = async (
  { username, password, email, firstName, lastName, isActive, role, age, city, country, department },
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
    age: age,
    city: city,
    country: country,
    department: department,
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
  age,
  city,
  country,
  department,
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
    age: age,
    city: city,
    country: country,
    department: department,
  };
};

module.exports = {
  getUserModel,
  parseUser,
};
