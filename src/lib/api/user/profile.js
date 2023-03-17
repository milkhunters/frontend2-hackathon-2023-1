import { makeGetRequest } from "../api";

const API_CURRENT_USER_URL = "user/current";

export const getCurrentUserProfileInfo = () => {
  return makeGetRequest(API_CURRENT_USER_URL);
};

export const getUserProfileInfo = async () => {
  return [null, { id: "123", email: "other@mail.ru", firstName: "otherUser", role: 2 }];
};

export const getUnreadMessagesCount = async () => {
  return [null, 5];
};

export const resetPassword = async (userId) => {
  return ["Неверный пароль.", null];
};

export const userFullName = (user) => {
  return `${user.lastName} ${user.firstName} ${user.patronymic}`;
};

export const roleDescription = (roleId) => {
  const startingId = 3;
  return ["User", "High User", "Administrator"][roleId - startingId];
};

export const validateProfile = (profile) => {
  return [
    "id",
    "avatar_id",
    "first_name",
    "last_name",
    "patronymic",
    "department",
    "job_title",
    "role",
  ].every((field) => field in profile);
};
