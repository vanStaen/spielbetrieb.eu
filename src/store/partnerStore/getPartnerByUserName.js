export async function getPartnerByUserName(userName) {
  const graphqlQuery = {
    query: `
            query (
                $userName: String, 
              ) {
                getPartnerByUserName (
                  partnerUserName: $userName
              ) {
                id,
                userName,
	              name,
                description,
                avatar,
                pictures,
                settings,
                reviews,
                lastActive,
                partnerRoles,
                partnertype,
                links,
                partnerTags,
                archived,
                suspended,
                pending,
                admin,
              }
            }
            `,
    variables: {
      userName
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
  return data.data.getPartnerByUserName;
}
