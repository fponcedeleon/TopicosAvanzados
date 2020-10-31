import { post } from "../utils/api.js";

const baseUrl =
  window.location.hostname === "localhost"
    ? "http://localhost:8080"
    : "https://topicossw.herokuapp.com";

export const customEmail = async (
  userName,
  userEmail,
  electionName,
  electionLink,
  subject,
  isNewElection,
  endDate = null
) => {
  await post(`${baseUrl}/sendMail`, {
    userName,
    userEmail,
    electionName,
    electionLink,
    subject,
    isNewElection,
    endDate,
  });
};

export const forgotPasswordEmail = async (userEmail, link, subject) => {
  await post(`${baseUrl}/sendMail/forgotPassword`, {
    userEmail,
    link,
    subject,
  });
};
