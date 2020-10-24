const helper = require('./helper');

module.exports = {
    getCurrent: helper.getCurrent,
    createUserModel: helper.createUserModel,
    parseUserInfo: helper.parseUserInfo,
    getUserByParams: helper.getUserByParams,
    saveUser: helper.saveUser,
    comparePassword: helper.comparePassword,
}