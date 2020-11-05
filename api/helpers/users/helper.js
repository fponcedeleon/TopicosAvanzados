const User = require('../../models/user');

/**
 * Returns the current user credentials given the auth propertie. 
 * @param {*} auth auth header contained in the request
 */
const getCurrent = auth => {
  return auth.credentials;
}

/**
 * returns a user model given the user's information
 * @param  param0 
 */
const createUserModel = ({ payload }) => {
  return new User(parseUserInfo(payload, true));
}

/**
 * 
 * @param {*} param0 user's information to include in response
 * @param {*} includePsw true if include password in response
 */
const parseUserInfo = ({ _id, firstName, lastName, email, password, role, isActive }, includePsw) => {
  return {
    id: _id,
    password: includePsw ? password : undefined,
    email: email || undefined,
    firstName: firstName || undefined,
    lastName: lastName || undefined,
    role: role || undefined,
    isActive: isActive || true,
  };
}

const getUserByParams = params => {
  return User.findOne(params)
    .exec()
    .then(response => {
      return response ? parseUserInfo(response) : null;
    })
    .catch(error => {
      return error;
    })
}

const saveUser = userModel => {
  return userModel.save().then(response => {
    return response;
  }).catch(error => {
    return error;
  })
}

const comparePassword = (email, password) => {
  return User.findOne({ email })
    .exec()
    .then(user => {
      if (user) {
        return user.comparePassword(password);
      }

      return false;
    })
    .catch(error => {
      return { status: 'Error', message: error.message };
    });
};

module.exports = {
  getCurrent,
  createUserModel,
  parseUserInfo,
  getUserByParams,
  saveUser,
  comparePassword,
}