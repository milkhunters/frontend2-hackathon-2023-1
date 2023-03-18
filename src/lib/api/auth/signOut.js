import { makeWriteRequest } from "../api.js";

const API_SIGNOUT_URL = "auth/logout";

const signOut = async () => {
  return await makeWriteRequest(API_SIGNOUT_URL);
};

export default signOut;
