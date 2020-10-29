import { get, post } from "../utils/api.js";

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
    `${baseUrl}/users/votants?minAge=${minAge}&maxAge=${maxAge}&city=${city}&department=${department}`
  );
  return users;
};

export const getCurrent = async () => {
  const { data } = await post(`${baseUrl}/users/current`, {});
  return data;
};

export const register = async ({
  username,
  firstName,
  lastName,
  email,
  age,
  country,
  city,
  department,
  password,
}) => {
  const { data } = await post(`${baseUrl}/users`, {
    username,
    firstName,
    lastName,
    email,
    age,
    country,
    city,
    department,
    password,
  });
  return data;
};

export const verifyAccount = async (userId) => {
  const { data } = await post(
    `${baseUrl}/users/validate/${userId}`
    , {});
  return data;
}


export const getToken = async ({
  user, 
  password
}) => {
  const { data } = await post(
    `${baseUrl}/sessions`,{
         user, 
         password
  }); 
  return data;
};
