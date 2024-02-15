export async function addLink(dataObject) {

  const graphqlQuery = {
    query: `mutation ( 
                $dataObject: AdminlinkInputData!,
                ) {
                addAdminlink (
                  adminlinkInput: $dataObject,
                ) {
                  _id
                }
                }`,
    variables: {
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
  return data.addAdminlink;
}
