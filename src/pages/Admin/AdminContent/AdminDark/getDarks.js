export async function getDarks() {
  const graphqlQuery = {
    query: `
            {
              getDarks {
                id,
                number,
                title,
                description,
                pictures,
                link,
                tags,
                archived,
                createdAt,
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
  return data.data.getDarks;
}
