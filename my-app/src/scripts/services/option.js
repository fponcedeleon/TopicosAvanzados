import { post, get } from "../utils/api.js";

const baseUrl =
  window.location.hostname === "localhost"
    ? "http://localhost:8080"
    : "https://topicossw.herokuapp.com";

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
  }

  return option;
};

export const getAllProposalOptions = async (proposalId) => {
  const { data: options } = await get(
    `${baseUrl}/options/byProposal?id=${proposalId}`
  );
  return options;
};

export const getOneOption = async (optionId) => {
  const { data: option } = await get(`${baseUrl}/options/${optionId}`);
  return option;
};

export const voteOption = async (optionId, userId) => {
  const optAux = await getOneOption(optionId);
  const nameAux = optAux.name;
  const arrAux = optAux.votants;
  if (arrAux.indexOf(userId) < 0) {
    arrAux.push(userId);
  }
  const { data: option } = await post(`${baseUrl}/options/${optionId}`, {
    name: nameAux,
    votants: arrAux,
  });
  return option;
};
