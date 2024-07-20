export const postUsernameTaken = async (username) => {
  const requestBody = {
    username,
  };

  const headers = {
    "content-type": "application/json",
  };

  const endpoint = process.env.API_URL + "/user/taken";

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
  return data.data.taken;
};
