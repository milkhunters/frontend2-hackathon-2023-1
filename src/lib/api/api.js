const API_BASE_URL = "https://hack.milkhunters.ru/api/v1";

const formatResponse = (data) => {
  const entries = Object.entries(data);
  const formattedEntries = entries.map(([key, value]) => {
    const [leave, ...toFormat] = key.split("_");
    const formatted = toFormat
      .map((part) => part[0].toUpperCase() + part.slice(1))
      .join("");
    return [leave + formatted, value];
  });
  return Object.fromEntries(formattedEntries);
};

const processApiResponse = (response) => {
  return response.error
    ? [response.error.content, null]
    : [null, formatResponse(response.message)];
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

    if (response.status === 204) return [null, null];
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
