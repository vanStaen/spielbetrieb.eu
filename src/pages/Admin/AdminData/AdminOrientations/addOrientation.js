export async function addOrientation(dataObject) {
  const graphqlQuery = {
    query: `mutation ( 
                $dataObject: OrientationInputData!,
                ) {
                addOrientation (
                  orientationInput: $dataObject,
                ) {
                  id
                }
                }`,
    variables: {
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
  const res = await response.json();

  if (res.errors) {
    return res.errors[0];
  }
  return res.data.addOrientation;
}
