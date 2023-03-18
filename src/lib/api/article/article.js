import { makeReadRequest, processApiResponse } from "../api";

const API_ARTICLES_URL = "acrticle/list";

export const getArticles = async () => {
  const [error, response] = await makeReadRequest(API_ARTICLES_URL, { count: 3 });
  if (error) return [error, null];
  return await response.json().then(processApiResponse);
};
