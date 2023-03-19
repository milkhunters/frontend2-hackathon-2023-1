const API_BASE_URL = "https://hack.milkhunters.ru/api/v1";

export const formatResponse = (data) => {
  if (!data) return data;
  const entries = Object.entries(data);
  const formattedEntries = entries.map(([key, value]) => {
    const [leave, ...toFormat] = key.split("_");
    const formatted = toFormat.map((part) => part[0].toUpperCase() + part.slice(1)).join("");
    return [leave + formatted, value];
  });
  return Object.fromEntries(formattedEntries);
};

export const processApiResponse = (response, error) => {
  return error ? [error.content.map(x => x.message).join("\n"), null] : [null, formatResponse(response.message)];
};

const makeRequest = async (url, method, headers, body) => {
  try {
    const response = await fetch(url, {
      method,
      headers,
      body,
      credentials: "include",
    });
    if (!response.ok) return [await response.json(), null];
    return [null, response];
  } catch (error) {
    console.error(error);
    return [error, null];
  }
};

export const encodeEmpty = () => {
  return { headers: undefined, body: undefined };
};

export const encodeJson = (record) => {
  return { headers: { "Content-Type": "application/json" }, body: JSON.stringify(record) };
};

export const encodeFile = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return { headers: {}, body: formData };
};

export const makeWriteRequest = async (apiUrl, options = encodeEmpty(), method = "POST") => {
  const url = `${API_BASE_URL}/${apiUrl}`;
  const { headers, body } = options;
  return await makeRequest(url, method, headers, body);
};

const buildUrl = (apiUrl, record = {}) => {
  const url = new URL(`${API_BASE_URL}/${apiUrl}`);
  Object.entries(record).forEach(([field, value]) => url.searchParams.set(field, value));
  return url;
};

export const makeReadRequest = async (apiUrl, record) => {
  const url = buildUrl(apiUrl, record);
  return await makeRequest(url, "GET");
};

export const connect = (apiUrl) => {
  const url = `wss://hack.milkhunters.ru/api/v1/${apiUrl}/ws`;
  return new WebSocket(url);
};
