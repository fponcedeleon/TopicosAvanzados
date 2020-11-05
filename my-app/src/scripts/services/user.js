import { get, post } from "../utils/api.js";
import { exec } from "child_process";

const baseUrl =
  window.location.hostname === "localhost"
    ? "http://localhost:8080"
    : "https://topicossw.herokuapp.com";

export const getUserById = async (id) => {
  const { data: user } = await get(`${baseUrl}/users/${id}`);
  return user;
};

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

export const getUserByEmail = async (userEmail) => {
  const { data: user } = await get(`${baseUrl}/users/byEmail/${userEmail}`);
  return user;
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

  if (data.status === "Error") {
    throw new Exception(data.message);
  }
  return data;
};

export const changePassword = async (userId, password) => {
  const { data: user } = await post(`${baseUrl}/users/resetPass/${userId}`, {
    password,
  });
  return user;
};

export const verifyAccount = async (userId) => {
  const { data } = await post(`${baseUrl}/users/validate/${userId}`, {});
  return data;
};

export const getToken = async (username, password) => {
  const { data } = await post(`${baseUrl}/sessions`, {
    username,
    password,
  });
  return data;
};
