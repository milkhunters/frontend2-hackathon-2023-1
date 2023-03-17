import { makeRequest } from "../api.js";

const API_SIGNIN_URL = "auth/signIp";
const API_SIGNOUT_URL = "auth/logout";

export const signIn = async (record) => {
  const [error] = await makeRequest(API_SIGNIN_URL, record);
  return error;
};

export const signOut = async () => {
  const [error] = await makeRequest(API_SIGNOUT_URL);
  return error;
};
