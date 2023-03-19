import { formatResponse, makeReadRequest } from "../api";

const API_DIALOGS_URL = "dialog/list";

const getDialogHistoryUrl = (id) => `dialog/${id}/history`;

export const getAllDialogs = async () => {
  const [_, dialogs] = await makeReadRequest(API_DIALOGS_URL);
  const data = await dialogs.json();
  return formatResponse(data.message);
};

export const getDialogHistory = async (dialogId) => {
  const [_, messages] = await makeReadRequest(getDialogHistoryUrl(dialogId), { user_id: dialogId });
  const data = await messages.json();
  return formatResponse(data.message);
};
