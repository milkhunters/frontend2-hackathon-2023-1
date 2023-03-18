import { makeReadRequest, processApiResponse } from "../api";

const API_CURRENT_USER_URL = "user/current";

export const getCurrentUserProfileInfo = async () => {
  const [error, response] = await makeReadRequest(API_CURRENT_USER_URL);
  if (error) return [error, null];
  return await response.json().then(processApiResponse);
};

export const getUserProfileInfo = async (userId) => {
  return [null, { id: "123", email: "other@mail.ru", firstName: "otherUser", role: 2 }];
};

export const getUnreadMessagesCount = async () => {
  return [null, 5];
};

export const resetPassword = async (userId) => {
  return ["Неверный пароль.", null];
};

export const changeAvatar = async (file) => {
  return [null, null] 
};
