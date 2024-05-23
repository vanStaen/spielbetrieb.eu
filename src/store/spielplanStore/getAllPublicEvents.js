export async function getAllPublicEvents(fromDate, untilDate) {
  const graphqlQuery = {
    query: `
              {
                getAllPublicEvents (
                    fromDate: ${fromDate}, 
                    untilDate: ${untilDate},
                  ) { 
                  _id,
                  eventtype,
                  title,
                  description,
                  pictures,
                  externalPicture,
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
                  user {
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
  return data.data.getAllPublicEvents;
}
