export async function getContacts() {

  const graphqlQuery = {
    query: `
            {
              getAllAdmincontacts {
                _id,
                name,
                email,
                details,
                archived,
              }
            }
          `
  };

  const headers = {
    "content-type": "application/json",
  };

  const endpoint = process.env.API_URL + `/graphql`;

  const options = {
    "method": "POST",
    "headers": headers,
    "body": JSON.stringify(graphqlQuery)
  };

  const response = await fetch(endpoint, options);
  const data = await response.json();

  if (data.errors) { return data.errors[0] };
  return data.data.getAllAdmincontacts;
}
