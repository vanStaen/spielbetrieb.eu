export async function updatePartnerLinks(partnerId, links) {
  const graphqlQuery = {
    query: `
    mutation ($partnerId: ID!, $links: [String]){
      updatePartner(
        partnerId: $partnerId,
        partnerInput: {          
          links: $links,
        }
      ) {
        id,
      }
    }
    `,
    variables: {
      partnerId,
      links,
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
