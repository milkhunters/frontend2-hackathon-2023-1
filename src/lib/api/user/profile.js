import { encodeJson, makeReadRequest, makeWriteRequest, processApiResponse } from "../api";

const API_CURRENT_USER_URL = "user/current";
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
  return [null, 5];
};

export const resetPassword = async (oldPassword, newPassword) => {
  const body = { old_password: oldPassword, new_password: newPassword };
  return makeWriteRequest(API_UPDATE_PASSWORD_URL, encodeJson(body));
};

export const changeAvatar = async (file) => {
  return [null, null]
};
