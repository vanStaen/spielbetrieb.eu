export async function getAllPartners() {
  const graphqlQuery = {
    query: `
            {
              getAllPartners { 
                id,
                name,
                description,
                avatar,
                pictures,
                settings,
                reviews,
                partnertype,
                partnerRoles,
                links,
                partnerTags,
                archived,
                suspended,
                admin,
                pending,
                lastActive,
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
  return data.data.getAllPartners;
}
