import { makeReadRequest, processApiResponse } from "../api";

const API_CURRENT_USER_URL = "user/current";
const API_UNREAD_COUNT_URL = "dialog/unread_count";

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

export const resetPassword = async (userId) => {
  return ["Неверный пароль.", null];
};

export const changeAvatar = async (file) => {
  return [null, null] 
};
