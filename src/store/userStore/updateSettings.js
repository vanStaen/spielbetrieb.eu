export async function updateSettings(emailSettings, profilSettings) {
  const graphqlQuery = {
    query: `
    mutation ($emailSettings: String, $profilSettings: String){
      updateUser(
        userInput: {          
          emailSettings: $emailSettings,
          profilSettings: $profilSettings,
        }
      ) {
        id,
      }
    }
    `,
    variables: {
      emailSettings: JSON.stringify(emailSettings),
      profilSettings: JSON.stringify(profilSettings),
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
  return data.updateTag;
}
