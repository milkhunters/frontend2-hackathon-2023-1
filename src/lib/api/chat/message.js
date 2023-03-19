import { makeReadRequest } from "../api.js";

const API_MARK_READ_URL = "dialog/message/read";

export const markMessageAsRead = (messageId) => {
  makeReadRequest(API_MARK_READ_URL, { message_id: messageId });
};
