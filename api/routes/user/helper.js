const User = require("../../models/user");

const getUserModel = async (
  { password, email, firstName, lastName, isActive, role, city, country, department, birthdate },
  { credentials }
) => {
  const ageCalculated = (new Date().getTime() - new Date(birthdate).getTime())/31536000000;

  return new User({
    birthdate: birthdate,
    password: password,
    email: email,
    firstName: firstName,
    lastName: lastName,
    isActive: isActive,
    role: role,
    age: Math.trunc(ageCalculated),
    city: city,
    country: country,
    department: department,
  });
};

const parseUser = ({
  _id,
  password,
  email,
  firstName,
  lastName,
  isActive,
  role,
  age,
  birthdate,
  city,
  country,
  department,
}) => {
  return {
    id: _id || undefined,
    password: password,
    birthdate: birthdate,
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
