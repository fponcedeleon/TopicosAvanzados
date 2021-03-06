import { post, get } from "../utils/api.js";

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
}

export const createNewToken = async (electionId, userId) => {
  const { data: token, error } = await post(`${baseUrl}/token`, {
    electionId,
    userId,
  });
  if (error) {
    if (error.status === 409) {
      throw new Error("Token already exists.");
    }
    throw error;
  }
  return token;
};

export const getToken = async (token) => {
  const { data: tokenApi } = await get(`${baseUrl}/token/${token}`);
  return tokenApi;
};

export const deleteToken = async (token) => {
  return await post(`${baseUrl}/token/${token}`);
};
