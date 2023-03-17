import { makePostRequest } from "./api";

const API_SIGNUP_URL = "auth/signUp";

export const signUp = async (record) => {
  const [error] = await makePostRequest(API_SIGNUP_URL, record);
  return error;
};
