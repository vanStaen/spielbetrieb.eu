export async function addEvent(dataObject) {
  const graphqlQuery = {
    query: `mutation ( 
                $dataObject: EventInputData!,
                ) {
                addEvent (
                  eventInput: $dataObject,
                ) {
                  _id
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
  const responseJson = await response.json();

  if (responseJson.errors) {
    return responseJson.errors[0];
  }
  return responseJson.data.addEvent;
}
