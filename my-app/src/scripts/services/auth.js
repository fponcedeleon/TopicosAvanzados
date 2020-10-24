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
  const { data: token, error } = await post(`${baseUrl}/token`, {
    electionId,
    userId,
  });
  if (error) {
    if (error.status === 409) {
      throw new Error("Token already exists.");
    }
    throw error;
    //throw new Error('Oops! Something went wrong...');
  }
  console.log(token)
  return token;
};

export const getToken = async (token) => {
  const { data: tokenApi } = await get(`${baseUrl}/token/${token}`);
  return tokenApi;
};

export const deleteToken = async (token) => {
  return await deleteApi(`${baseUrl}/token/${token}`);
};
