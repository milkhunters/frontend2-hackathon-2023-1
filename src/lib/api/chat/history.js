import { connect, formatResponse } from "../api.js";
import { saveFile } from "../file/file.js";
import { map } from "../../arrays.js";

const getDialogWsUrl = (id) => `dialog/${id}`;

const subscriptions = new Map();

export const subscribeToDialog = (id, callback) => {
  if (subscriptions.get(id)) unsubscribeFromDialog(id);

  const connection = connect(getDialogWsUrl(id));

  connection.addEventListener("close", (event) => callback(event.reason, null));
  connection.addEventListener("error", (error) => console.error(error));
  connection.addEventListener("message", (event) => callback(null, formatResponse(JSON.parse(event.data))));

  subscriptions.set(id, connection);

  return async (text, files) => {
    const fileIds = await Promise.allSettled(map(files, (f) => saveFile(f)));
    const fileUuids = await Promise.allSettled(fileIds.map((f) => f.value[1]).map(r => r.json()))
    const data = { text, files: fileUuids.map(f => f.value.message.id) };
    connection.send(JSON.stringify(data));
  };
};

export const unsubscribeFromDialog = (id) => {
  subscriptions.get(id).close();
  subscriptions.delete(id);
};
