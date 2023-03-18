
import { makeReadRequest, processApiResponse } from "../api";

const API_BANNERS_URL = "banner/list";

export const getBanners = async () => {
  const [error, response] = await makeReadRequest(API_BANNERS_URL);
  if (error) return [error, null];
  return await response.json().then(processApiResponse);
};
