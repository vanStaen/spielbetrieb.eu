export async function updateAvatar(path) {
  const graphqlQuery = {
    query: `
    mutation ($path: String) {
      updateUser(
        userInput: {
          avatar: $path,
        }
      ) {
        avatar,
      }
    }`,
    variables: {
      path,
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
  return data.data.updateUser;
}
