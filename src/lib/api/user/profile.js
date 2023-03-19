import { encodeJson, makeReadRequest, makeWriteRequest, processApiResponse } from "../api";

const API_CURRENT_USER_URL = "user/current";
const API_UPDATE_PASSWORD_URL = "user/update_my_password";
const API_UNREAD_COUNT_URL = "dialog/unread_count";
const API_GET_URL= "user";

export const getCurrentUserProfileInfo = async () => {
  const [error, response] = await makeReadRequest(API_CURRENT_USER_URL);
  if (error) return [error, null];
  return await response.json().then(processApiResponse);
};

export const getUserProfileInfo = async (userId) => {
  const [error, response] = await makeReadRequest(API_GET_URL, {user_id: userId})
  if (error) return [error, null];
  return await response.json().then(processApiResponse);
};

export const getUnreadMessagesCount = async () => {
  const [_, response] = await makeReadRequest(API_UNREAD_COUNT_URL);
  const data = await response.json();
  return data.message;
};

export const resetPassword = async (oldPassword, newPassword) => {
  const body = { old_password: oldPassword, new_password: newPassword };
  const [error, response] = await makeWriteRequest(API_UPDATE_PASSWORD_URL, encodeJson(body));
  const data = response ? await response.json() : null;
  return processApiResponse(data, error.error);
};

export const changeAvatar = async (file) => {
  return [null, null]
};
