export const postLogin = async (email, username, password, remind) => {
  const requestBody = {
    email,
    username,
    password,
    remind,
  };

  const headers = {
    "content-type": "application/json",
  };

  const endpoint = process.env.API_URL + "/auth/login/";

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
  console.log(data)
  return data;
}

