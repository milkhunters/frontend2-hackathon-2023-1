import { encodeJson, makeWriteRequest } from "../api.js";

const API_SIGNIN_URL = "auth/signIn";
const API_SIGNOUT_URL = "auth/logout";

export const signIn = async (record) => {
  return await makeWriteRequest(API_SIGNIN_URL, encodeJson(record));
};

export const signOut = async () => {
  return await makeWriteRequest(API_SIGNOUT_URL);
};
