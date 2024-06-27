export async function getUsersAsAdmin() {
  const graphqlQuery = {
    query: `
            {
              getUsersAsAdmin { 
                _id,
                isAdmin,
                adminRoles,
                firstName,
                lastName,
                userName,
                email,
                description,
                avatar,
                emailSettings,
                profilSettings,
                verifiedEmail,
                verifiedIdentity,
                gender,
                orientation,
                wishes,
                interests,
                lastActive,
                archived,
                usernameChange,
                language,
                deleted,
                suspended,
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
  return data.data.getUsersAsAdmin;
}
