export async function updatePartnerTags(partnerId, tags) {
  const graphqlQuery = {
    query: `
    mutation ($partnerId: ID!, $tags: [Int]){
      updatePartner(
        partnerId: $partnerId,
        partnerInput: {          
          partnerTags: $tags,
        }
      ) {
        id,
      }
    }
    `,
    variables: {
      partnerId,
      tags,
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
