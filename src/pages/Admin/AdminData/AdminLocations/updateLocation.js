
export async function updateLocation(id, dataObject) {

  const graphqlQuery = {
    query: `mutation ( 
                $id: ID!,
                $dataObject: LocationInputData!,
                ) {
                updateLocation (
                  locationId: $id,
                  locationInput: $dataObject,
                ) {
                  _id
                }
                }`,
    variables: {
      id,
      dataObject,
    }
  };

  const headers = {
    "content-type": "application/json",
  };

  const endpoint = process.env.API_URL + `/graphql`;

  const options = {
    "method": "POST",
    "headers": headers,
    "body": JSON.stringify(graphqlQuery)
  };

  const response = await fetch(endpoint, options);
  const data = await response.json();

  if (data.errors) { return data.errors[0] };
  return data.updateLocation;
}
