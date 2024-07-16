export async function updatePartnerAvatar(partnerId, path) {
  const graphqlQuery = {
    query: `
    mutation ($partnerId: ID!, $path: String){
      updatePartner(
        partnerId: $partnerId,
        partnerInput: {          
          avatar: $path,
        }
      ) {
        avatar,
      }
    }
    `,
    variables: {
      partnerId,
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
  return data.data.updatePartner;
}
