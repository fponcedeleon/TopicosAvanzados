const nodemailer = require("nodemailer");
const { getTemplate } = require("./template");

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
  endDate,
  electionLink,
  subject
) => {
  const text = getTemplate(userName, electionName, endDate, electionLink);
  sendEmail(subject, userEmail, text);
};

module.exports = {
  customEmail,
};
