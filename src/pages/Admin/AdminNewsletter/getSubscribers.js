export async function getSubscribers() {
  const graphqlQuery = {
    query: `
            {
              getSubscribers { 
                id,
                username,
                email,
                language,
                about,
                lists,
                interests,
                verifiedEmail
              }
            }
          `,
  };

  const headers = {
    "content-type": "application/json",
  };

  const endpoint = process.env.API_URL + "/graphql";

  const options = {
    method: "POST",
    headers,
    body: JSON.stringify(graphqlQuery),
  };

  const response = await fetch(endpoint, options);
  const data = await response.json();

  if (data.errors) {
    return data.errors[0];
  }
  return data.data.getSubscribers;
}
