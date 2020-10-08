import { post, get, put, deleteApi } from "../utils/api.js";
//import { removePostId } from "../utils/session.js";

const baseUrl =
  window.location.hostname === "localhost"
    ? "http://localhost:8080"
    : "http://localhost:8080"; //ACA VA HEROKU CUANDO ESTE ANDANDO

export const createNewElection = async (
  createdBy,
  startDate,
  endDate,
  minAge,
  maxAge,
  city,
  country,
  name
) => {
  const { data: election, error } = await post(`${baseUrl}/elections`, {
    createdBy,
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
    //throw new Error('Oops! Something went wrong...');
  }

  return election;
};

export const getAllElections = async () => {
  const { data: elections } = await get(`${baseUrl}/elections`); //IMPLEMENTAR RUTA EN API
  console.log(elections);
  return elections;
};

export const getOnePost = async (electionId) => {
  const { data: election } = await get(`${baseUrl}/elections/${electionId}`);
  return election;
};
