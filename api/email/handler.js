const nodemailer = require("nodemailer");
const { 
  getTemplateResults, 
  getTemplateNewElection,
  getTemplateValidateUser,
} = require("./template");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  auth: {
    type: "login",
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendEmail = async (subject, to, text) => {
  await transporter.sendMail(
    { from: process.env.EMAIL_USERNAME, to, subject, text },
    (error, info) => {
      if (error) {
        console.log("Error: " + error);
      } else {
        console.log("Email sent: " + info.response);
      }
    }
  );
};

const customEmail = (
  userName,
  userEmail,
  electionName,
  electionLink,
  subject,
  isNewElection,
  endDate
) => {
  let text;
  if (isNewElection) {
    text = getTemplateNewElection(
      userName,
      electionName,
      endDate,
      electionLink
    );
  } else {
    text = getTemplateResults(userName, electionName, electionLink);
  }
  sendEmail(subject, userEmail, text);
};

const validateUserEmail = (
  userName,
  userEmail,
  link,
  subject,
) => {
  const text = getTemplateValidateUser(userName, link);
  sendEmail(subject, userEmail, text);
};

module.exports = {
  customEmail,
  validateUserEmail,
};
