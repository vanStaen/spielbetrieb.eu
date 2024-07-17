export async function updateUserName(userName, usernameChange) {
  const graphqlQuery = {
    query: `
    mutation ($userName: String, $usernameChange: Int){
      updateUser(
        userInput: {          
          userName: $userName,
          usernameChange: $usernameChange
        }
      ) {
        id,
      }
    }
    `,
    variables: {
      userName,
      usernameChange,
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
