import { encodeJson, makeWriteRequest } from "../api.js";

const API_SIGNIN_URL = "auth/signIn";

const signIn = async (record) => {
  return await makeWriteRequest(API_SIGNIN_URL, encodeJson(record));
};

export default signIn;
