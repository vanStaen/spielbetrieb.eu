export async function getSingleEvents(id) {
  const graphqlQuery = {
    query: `
              {
                getEvent (
                    eventId: ${parseInt(id)}, 
                  ) { 
                  id,
                  eventtype,
                  title,
                  description,
                  pictures,
                  externalPicture,
                  location,
                  locationAddress,
                  locationName,
                  locationCoordinates,
                  fromDate,
                  untilDate,
                  eventTags,
                  hasDresscode,
                  dresscodeDoTags,
                  dresscodeDontTags,
                  prices,
                  lineUp,
                  equipment,
                  ageMin,
                  currency,
                  attendees,
                  invited,
                  links,
                  private,
                  forwardable,
                  allowAnonymous,
                  createdAt,
                  updatedAt,
                  validated,
                  partnerId,
                  user {
                    id,
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
