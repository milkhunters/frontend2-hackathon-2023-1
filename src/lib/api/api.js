const API_BASE_URL = "https://hack.milkhunters.ru/api/v1";

const processApiResponse = (response) => {
  const errorHappend = response.error?.type === 2 || response.error?.type === 1 && response.message === null;
  console.log(response);
  return errorHappend
    ? [response.error.content, null]
    : [null, response.message];
};

export const makeRequest = async (apiUrl, record, method = "POST") => {
  const fullUrl = `${API_BASE_URL}/${apiUrl}`;
  const headers = record ? { "Content-Type": "application/json" } : undefined;
  const body = record ? JSON.stringify(record) : record;

  try {
    const response = await fetch(fullUrl, {
      method,
      headers,
      body,
      credentials: "include",
    });

    const data = await response.json();
    return processApiResponse(data);
  } catch (error) {
    console.error(error);
    return [error, null];
  }
};

const buildUrl = (apiUrl, record = {}) => {
  const url = new URL(`${API_BASE_URL}/${apiUrl}`);
  Object.entries(record).forEach(([field, value]) => url.searchParams.set(field, value));
  return url;
};

export const makeGetRequest = async (apiUrl, record) => {
  const url = buildUrl(apiUrl, record);
  try {
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });
    
    const data = await response.json();
    return processApiResponse(data);
  } catch (error) {
    console.error(error);
    return [error, null];
  }
};
