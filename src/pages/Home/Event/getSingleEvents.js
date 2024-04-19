export async function getSingleEvents(id) {
  const graphqlQuery = {
    query: `
              {
                getEvent (
                    eventId: ${parseInt(id)}, 
                  ) { 
                  _id,
                  eventtype,
                  title,
                  description,
                  pictures,
                  links,
                  location,
                  locationAddress,
                  locationName,
                  locationCoordinates,
                  fromDate,
                  untilDate,
                  eventTags,
                  attendees,
                  createdAt,
                  updatedAt,
                  validated,
                  user {
                    _id,
                    userName,
                  }
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
  return data.data.getEvent;
}
