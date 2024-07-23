export const getHasAccess = async () => {
  const headers = {
    "content-type": "application/json",
  };

  const endpoint = process.env.API_URL + "/auth/access/";

  const options = {
    method: "GET",
    headers,
  };

  const response = await fetch(endpoint, options);
  const data = await response.json();

  if (data.errors) {
    return data.errors[0];
  }
  return data.access;
};
