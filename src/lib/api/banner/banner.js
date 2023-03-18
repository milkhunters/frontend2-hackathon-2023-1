import { makeReadRequest, processApiResponse } from "../api";

const API_BANNERS_URL = "banner/list";
const API_FILES_URL = "file/download";
const FILE_STORAGE_URL = "https://hack.milkhunters.ru/api/v1/file/download";

export const getFileUrl = (id) => `${FILE_STORAGE_URL}/${id}`;

export const getBanners = async () => {
  const [error, response] = await makeReadRequest(API_BANNERS_URL);
  if (error) return [error, null];
  const bannersIds = await response.json().then(processApiResponse);
  const x = Object.values(bannersIds[1]).map(({ file_id }) => getFileUrl(file_id));
  console.log(x)
  return x;
};
