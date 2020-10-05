import { post, get, put, deleteApi } from "../utils/api.js";
//import { removePostId } from "../utils/session.js";

const baseUrl =
  window.location.hostname === "localhost"
    ? "http://localhost:8080"
    : "http://localhost:8080"; //ACA VA HEROKU CUANDO ESTE ANDANDO

export const createNewOption = async (proposalId, name) => {
  const { data: option, error } = await post(`${baseUrl}/options`, {
    proposalId,
    name,
  });
  if (error) {
    if (error.status === 409) {
      throw new Error("Option already exists.");
    }
    throw error;
    //throw new Error('Oops! Something went wrong...');
  }

  return option;
};

export const getAllProposalOptions = async () => {
  const { data: options } = await get(`${baseUrl}/options/byProposal/${proposalId}`); //IMPLEMENTAR RUTA EN API
  return options;
};

export const getOneOption = async (optionId) => {
  const { data: option } = await get(`${baseUrl}/options/${optionId}`);
  return option;
};
