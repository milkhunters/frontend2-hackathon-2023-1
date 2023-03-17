import { makeRequest } from "../api";

const API_SIGNUP_URL = "auth/signUp";

export const signUp = async (record) => {
  const [error] = await makeRequest(API_SIGNUP_URL, record, "PUT");
  return error;
};
