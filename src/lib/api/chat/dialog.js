import { encodeJson, formatResponse, makeReadRequest, makeWriteRequest } from "../api";

const API_DIALOGS_URL = "dialog/list";
const API_USERS_URL = "user/list";
const API_OPENDIALOG_URL = "dialog/open";

const getDialogHistoryUrl = (id) => `dialog/${id}/history`;

export const getAllDialogs = async () => {
  const [_, dialogs] = await makeReadRequest(API_DIALOGS_URL);
  const data = await dialogs.json();
  return data.message.map((d) => formatResponse(d));
};

export const getDialogHistory = async (dialogId) => {
  const [_, messages] = await makeReadRequest(getDialogHistoryUrl(dialogId), { user_id: dialogId });
  const data = await messages.json();
  return formatResponse(data.message);
};

export const getAllUsers = async () => {
  const [_, users] = await makeReadRequest(API_USERS_URL);
  const data = await users.json();
  return data.message.map((r) => formatResponse(r));
};

export const openDialog = (userId) => {
  return makeWriteRequest(API_OPENDIALOG_URL, encodeJson({ user_id: userId })); 
};
