import { post } from "../utils/api.js";

const baseUrl =
  window.location.hostname === "localhost"
    ? "http://localhost:8080"
    : "https://topicossw.herokuapp.com";

export const customEmail = async (
  userName,
  userEmail,
  electionName,
  endDate,
  electionLink,
  subject
) => {
  await post(`${baseUrl}/sendMail`, {
    userName,
    userEmail,
    electionName,
    endDate,
    electionLink,
    subject,
  });
};
