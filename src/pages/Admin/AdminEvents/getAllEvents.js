export async function getAllEvents() {
  const graphqlQuery = {
    query: `
            {
              getAllEvents { 
                id,
                eventtype,
                title,
                description,
                pictures,
                externalPicture,
                location,
                locationAddress,
                locationCoordinates,
                locationName,
                fromDate,
                untilDate,
                eventTags,
                attendees,
                invited,
                admin,
                private,
                forwardable,
                allowAnonymous,
                createdAt,
                updatedAt,
                isDraft,
                hasDresscode,
                dresscodeDoTags,
                dresscodeDontTags,
                prices,
                lineUp,
                ageMin,
                currency,
                validated,
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
  return data.data.getAllEvents;
}
