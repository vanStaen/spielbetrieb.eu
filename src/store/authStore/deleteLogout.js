export const deleteLogout = async () => {
  const headers = {
    "content-type": "application/json",
  };

  const endpoint = process.env.API_URL + "/auth/logout/";

  const options = {
    method: "DELETE",
    headers,
  };

  const response = await fetch(endpoint, options);
  const data = await response.json();

  if (data.errors) {
    return data.errors[0];
  }
  return data.success;
}
