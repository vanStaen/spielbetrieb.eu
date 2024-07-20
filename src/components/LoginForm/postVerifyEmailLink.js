export const postVerifyEmailLink = async (emailOrUsername, language = "en") => {
  const requestBody = {
    sendto: emailOrUsername,
    language,
  };

  const headers = {
    "content-type": "application/json",
  };

  const endpoint = process.env.API_URL + "/user/emailverify";

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
  return true;
};
