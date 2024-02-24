export async function updateTag(id, dataObject) {
  const graphqlQuery = {
    query: `mutation ( 
                $id: ID!,
                $dataObject: TagInputData!,
                ) {
                updateTag (
                  tagId: $id,
                  tagInput: $dataObject,
                ) {
                  _id
                }
                }`,
    variables: {
      id,
      dataObject,
    },
  };

  const headers = {
    "content-type": "application/json",
  };

  const endpoint = process.env.API_URL + `/graphql`;

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
  return data.updateTag;
}
