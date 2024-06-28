export async function getTags() {
  const graphqlQuery = {
    query: `
            {
              getTags { 
                id,
                name,
                isUserTag,
                isEventTag,
                isPictureTag,
                validated,
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
  return data.data.getTags;
}
