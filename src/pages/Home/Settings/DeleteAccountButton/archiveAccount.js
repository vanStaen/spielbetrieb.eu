export async function archiveAccount(archived) {
  const graphqlQuery = {
    query: `
    mutation ($archived: Boolean) {
      updateUser(
        userInput: {          
          archived: $archived,
        }
      ) {
        id,
      }
    }    
    `,
    variables: {
      archived,
    },
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
  return true;
}
