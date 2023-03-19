import { encodeFile, makeReadRequest, makeWriteRequest } from "../api.js";

const API_FILE_SAVE_URL = "file/save";
const API_FILE_DOWNLOAD_URL = "file/download"

export const getFileUrl = (id) => `${API_FILE_DOWNLOAD_URL}/${id}`;

export const saveFile = (file) => {
  console.log("file", file)
  return makeWriteRequest(API_FILE_SAVE_URL, encodeFile(file));
};

export const downloadFile = (fileId) => {
  return makeReadRequest(getFileUrl(fileId));
};
