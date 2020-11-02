const config = require('./config');

module.exports = [{ method: 'POST', path: '/sendMail', config: config.create }];
module.exports = [{ method: 'POST', path: '/sendMail/forgotPassword', config: config.forgotPasswordMail }]