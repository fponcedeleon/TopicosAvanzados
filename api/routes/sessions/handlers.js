const helper = require("../../helpers/sessions");
const Boom = require("@hapi/boom");

const create = async payload => {
    const { email, password } = payload;

    const token = await helper.create(email, password);
    if (token) {
        return { status: 'Success', result: token };
    }

    throw Boom.unauthorized('Email or password incorrect');
};

module.exports = {
    create,
}