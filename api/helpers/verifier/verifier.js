const Verifier = require("email-verifier");

const verify = (email) => {
    console.log(email);
    let verifier = new Verifier("at_06fHyyaNQRUDMxPNQz8UcmtRnfv6s");
    verifier.verify(email, (err, data) => {
        if (err) throw err;
        console.log(data);
    });
}

module.exports = {
    verify,
}