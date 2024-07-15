export async function updatePartnerText(partnerId, field, value) {
  const graphqlQuery = {
    query: `
    mutation ($partnerId: ID!, $value: String!){
      updatePartner(
        partnerId: $partnerId,
        partnerInput: {          
          ${field}: $value,
        }
      ) {
        id,
      }
    }
    `,
    variables: {
      partnerId,
      value,
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