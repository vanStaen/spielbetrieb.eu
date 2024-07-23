export const getProfilePartners = async (id) => {
  const graphqlQuery = {
    query: `
        {
            getProfilePartnersById (id: "${id}"){ 
                id,
                name,
                userName,
                description,
                avatar,
                pending,
                suspended,
                partnerTags,
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
  return data.data.getProfilePartnersById;
};
