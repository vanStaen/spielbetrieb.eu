export async function addFollow(id) {
  const graphqlQuery = {
    query: `mutation ( $id: ID! ) {
                addFollow ( followed_id: $id ) 
                }`,
    variables: {
      id,
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
  const res = await response.json();

  if (res.errors) {
    return res.errors[0];
  }
  return res.data.addFollow;
}
