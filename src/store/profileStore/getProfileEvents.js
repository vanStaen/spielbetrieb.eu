export const getProfileEvents = async (id) => {
  const graphqlQuery = {
    query: `
        {
            getProfileEventsById (id: "${id}"){  
                id,
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
                validated,
                isDraft,
                private,
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
  return data.data.getProfileEventsById;
}

