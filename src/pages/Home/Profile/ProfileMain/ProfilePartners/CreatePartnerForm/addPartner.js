export async function addPartner(name, description, avatar, partnertype) {
  const graphqlQuery = {
    query: `
            mutation (
                $name: String, 
                $description: String, 
                $avatar: String, 
                $partnertype: Int,
              ) {
                addPartner(
                  partnerInput: { 
                    name: $name,
                    description: $description,
                    avatar: $avatar,
                    partnertype: $partnertype,
                  }
              ) {
                id
              }
            }
            `,
    variables: {
      name,
      description,
      avatar,
      partnertype,
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
  return data.data.addPartner;
}
