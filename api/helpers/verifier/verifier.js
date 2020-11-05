const Verifier = require("email-verifier");

const verify = (email) => {
  let verifier = new Verifier(process.env.EMAIL_VERIFIER_API_KEY);
  verifier.verify(email, (err, data) => {
    if (err) throw err;
  });
};

module.exports = {
  verify,
};
