const API_BASE_URL = "https://hack.milkhunters.ru/api/v1";

const processApiResponse = (response) => {
  // const errorHappend = response.status !== 200 || response.data !== null;
  return ["error", null];

  // return errorHappend
  //   ? [response.data.error.message, null]
  //   : [null, response.data];
};

export const makePostRequest = async (apiUrl, body) => {
  const fullUrl = `${API_BASE_URL}/${apiUrl}`;

  try {
    const response = await fetch(fullUrl, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    return processApiResponse(response);
  } catch (error) {
    console.error(error);
    return [error, null];
  }
};

const buildUrl = (apiUrl, body) => {
  const url = new URL(`${API_BASE_URL}/${apiUrl}`);
  Object.entries(body).forEach(([field, value]) => url.searchParams.set(field, value));
  return url;
};

export const makeGetRequest = async (apiUrl, body) => {
  const url = buildUrl(apiUrl, body);
  try {
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });
    
    return processApiResponse(response);
  } catch (error) {
    console.error(error);
    return [error, null];
  }
};
