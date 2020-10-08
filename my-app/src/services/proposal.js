import { post, get, put, deleteApi } from "../utils/api.js";
//import { removePostId } from "../utils/session.js";

const baseUrl =
  window.location.hostname === "localhost"
    ? process.env.LOCAL_URL
    : process.env.URL; //ACA VA HEROKU CUANDO ESTE ANDANDO

export const createNewProposal = async (electionId, name, description) => {
  const { data: proposal, error } = await post(`${baseUrl}/proposals`, {
    electionId,
    name,
    description,
  });
  if (error) {
    if (error.status === 409) {
      throw new Error("Proposal already exists.");
    }
    throw error;
    //throw new Error('Oops! Something went wrong...');
  }

  return proposal;
};

export const getAllElectionProposals = async () => {
  const { data: proposals } = await get(
    `${baseUrl}/proposals/byElection?id=${electionId}`
  );
  return proposals;
};

export const getOnePost = async (proposalId) => {
  const { data: proposal } = await get(`${baseUrl}/proposals/${proposalId}`);
  return proposal;
};
