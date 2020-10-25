const helper = require("../../helpers/sessions");
const Boom = require("@hapi/boom");

const create = async payload => {
    const { username, password } = payload;

    const token = await helper.create(username, password);
    if (token) {
        return { status: 'Success', result: token };
    }

    throw Boom.unauthorized('Username or password incorrect');
};

module.exports = {
    create,
}