import { makePostRequest } from "./api.js";

const API_SIGNIN_URL = "auth/signIp"

export const signIn = async (record) => {
  const [error] = await makePostRequest(API_SIGNIN_URL, record);
  return error
};
