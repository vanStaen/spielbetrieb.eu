export async function archivePartner(id, archived) {
  const graphqlQuery = {
    query: `mutation ( $id: ID!, $archived: Boolean ) {
                  archivePartner ( partnerId: $id, archived: $archived ) 
                }`,
    variables: {
      id,
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
    return data;
  }
  return data.data.archivePartner;
}
