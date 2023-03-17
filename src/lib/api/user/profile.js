import { makeGetRequest } from "../api";

const API_CURRENT_USER_URL = "user/current";

export const getCurrentUserProfileInfo = () => {
  return makeGetRequest(API_CURRENT_USER_URL);
}
