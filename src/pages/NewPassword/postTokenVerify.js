export const postTokenVerify = async (token) => {
  const requestBody = {
    token,
  };

  const headers = {
    "content-type": "application/json",
  };

  const endpoint = process.env.API_URL + "/user/validtoken";

  const options = {
    method: "POST",
    headers,
    body: JSON.stringify(requestBody),
  };

  const response = await fetch(endpoint, options);
  const data = await response.json();

  if (data.errors) {
    return data.errors[0];
  }
  return data.data.valid;
};
