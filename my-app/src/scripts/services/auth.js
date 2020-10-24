import { post, deleteApi, get } from "../utils/api.js";

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

export const createNewToken = async (electionId, userId) => {
  await post(`${baseUrl}/token`, { electionId, userId });
};

export const getToken = async (token) => {
  await get(`${baseUrl}/token/${token}`);
};

export const deleteToken = async (token) => {
  await deleteApi(`${baseUrl}/token/${token}`);
};
