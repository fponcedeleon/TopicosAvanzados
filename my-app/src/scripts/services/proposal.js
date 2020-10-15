import { post, get } from "../utils/api.js";
//import { removePostId } from "../utils/session.js";

const baseUrl =
  window.location.hostname === "localhost"
    ? "http://localhost:8080"
    : "https://topicossw-test.herokuapp.com";

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

export const getAllElectionProposals = async (electionId) => {
  const { data: proposals } = await get(
    `${baseUrl}/proposals/byElection?id=${electionId}`
  );
  return proposals;
};

export const getOnePost = async (proposalId) => {
  const { data: proposal } = await get(`${baseUrl}/proposals/${proposalId}`);
  return proposal;
};
