import { post, get } from "../utils/api.js";

const baseUrl =
  window.location.hostname === "localhost"
    ? "http://localhost:8080"
    : "https://topicossw.herokuapp.com";

export const createNewElection = async (
  startDate,
  endDate,
  minAge,
  maxAge,
  city,
  country,
  name
) => {
  const { data: election, error } = await post(`${baseUrl}/elections`, {
    startDate,
    endDate,
    minAge,
    maxAge,
    city,
    country,
    name
  });
  if (error) {
    if (error.status === 409) {
      throw new Error("Election already exists.");
    }
    throw error;
  }

  return election;
};

export const getAllElections = async () => {
  const { data: elections } = await get(`${baseUrl}/elections`);
  return elections;
};

export const getOnePost = async (electionId) => {
  const { data: election } = await get(`${baseUrl}/elections/${electionId}`);
  return election;
};
