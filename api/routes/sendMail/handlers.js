const CustomEmail = require("../../email/index");

const create = async (request, h) => {
  const {
    userName,
    userEmail,
    electionName,
    electionLink,
    subject,
    isNewElection,
    endDate,
  } = request.payload;
  try {
    await CustomEmail.customEmail(
      userName,
      userEmail,
      electionName,
      electionLink,
      subject,
      isNewElection,
      endDate
    );

    return h ? h.response({ email: "Email has been sent" }).code(201) : null;
  } catch (error) {
    return h ? h.response({ err: "Failed to send email" }).code(500) : error;
  }
};

const forgotPasswordMail = async (request, h) => {
  const { userEmail, link, subject } = request.payload;
  try {
    await CustomEmail.forgotPasswordEmail(userEmail, link, subject);
    return h ? h.response({ email: "Email has been sent" }).code(201) : null;
  } catch (error) {
    return h ? h.response({ err: "Failed to send email" }).code(500) : error;
  }
}

module.exports = {
  create,
  forgotPasswordMail,
};
