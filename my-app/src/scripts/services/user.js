import { post, put, get } from "../utils/api.js";

const baseUrl =
  window.location.hostname === "localhost"
    ? "http://localhost:8080"
    : "https://topicossw.herokuapp.com";

export const getAllUsers = async () => {
  const { data: users } = await get(`${baseUrl}/users`);
  return users;
};

export const getFilteredUsers = async (minAge, maxAge, city, department) => {
  const { data: users } = await get(
    `${baseUrl}/users?minAge=${minAge}&maxAge=${maxAge}&city=${city}&department=${department}`
  );
  return users;
};
