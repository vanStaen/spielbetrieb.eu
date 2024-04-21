export async function updateTranslation(id, dataObject) {
  const graphqlQuery = {
    query: `mutation ( 
                $id: ID!,
                $dataObject: TranslationInputData!,
                ) {
                updateTranslation (
                  translationId: $id,
                  translationInput: $dataObject,
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
  return data.updateTranslation;
}
