import axios from "axios";

export const getProfileEvents = async (id) => {
  const requestBody = {
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

  const response = await axios({
    url: process.env.API_URL + "/graphql",
    method: "POST",
    data: requestBody,
  });

  if ((response.status !== 200) & (response.status !== 201)) {
    throw new Error("Unauthenticated!");
  }

  return response.data.data.getProfileEventsById;
};
