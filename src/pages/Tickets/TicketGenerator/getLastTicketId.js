export const getLastTicketId = async () => {
  const headers = {
    "content-type": "application/json",
  };

  const endpoint = process.env.API_URL + "/ticket/lastid";

  const options = {
    method: "GET",
    headers,
  };

  const response = await fetch(endpoint, options);
  const data = await response.json();

  if ((data.status !== 200) & (data.status !== 201) & (data.status !== 403)) {
    if (data.status === 401) {
      throw new Error(`Error! Unauthorized(401)`);
    } else {
      throw new Error(`Error! Status ${response.status}`);
    }
  }

  return data;
};
