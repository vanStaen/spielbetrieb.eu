export async function updateLocation(location) {
  const graphqlQuery = {
    query: `
    mutation ($location: Int!){
      updateUser(
        userInput: {          
          location: $location,
        }
      ) {
        _id,
      }
    }
    `,
    variables: {
      location,
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
