import { encodeJson, makeReadRequest, makeWriteRequest, processApiResponse } from "../api";

const API_CURRENT_USER_URL = "user/current";
const API_UNREAD_COUNT_URL = "dialog/unread_count";
const API_UPDATE_PASSWORD_URL = "user/update_my_password";

export const getCurrentUserProfileInfo = async () => {
  const [error, response] = await makeReadRequest(API_CURRENT_USER_URL);
  if (error) return [error, null];
  return await response.json().then(processApiResponse);
};

export const getUserProfileInfo = async (userId) => {
  return [null, { id: "123", email: "other@mail.ru", firstName: "otherUser", role: 3 }];
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
  console.log(error, data)
  return processApiResponse(data, error.error);
};

export const changeAvatar = async (file) => {
  return [null, null]
};
