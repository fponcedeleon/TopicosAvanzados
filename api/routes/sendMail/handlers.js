const CustomEmail = require("../../email/index");

const create = async (request, h) => {
  const {
    userName,
    userEmail,
    electionName,
    endDate,
    electionLink,
    subject,
  } = request.payload;
  try {
    await CustomEmail.customEmail(
      userName,
      userEmail,
      electionName,
      endDate,
      electionLink,
      subject
    );
    return h.response({ email: "Email has been sent" }).code(201);
  } catch (error) {
    return h.response({ err: "Failed to send email" }).code(500);
  }
};

module.exports = {
  create,
};
