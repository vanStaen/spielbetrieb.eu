export const getProfileInfo = async (username) => {
  const graphqlQuery = {
    query: `
        {
            getProfileByName (userName: "${username}"){
                id,
                isAdmin,
                adminRoles,
                firstName,
                lastName,
                userName,
                email,
                description,
                avatar,
                emailSettings,
                profilSettings,
                verifiedIdentity,
                language,
                gender,
                orientation,
                location,
                wishes,
                userTags,
                birthday,
                interests,
                links,
                reviews {
                    id,
                },
                partners {
                  id,
                },
                events {
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
                  user {
                      userName,
                  }
                },
                lastActive,
                archived,
                usernameChange,
                comments {
                    id,
                },
                events {
                    id,
                },
                messages {
                    id,
                },
                photos {
                    id,
                },
                visitors {
                    id,
                },
                friends {
                    userName,
                    avatar,
                },
                friendrequests {
                    userName,
                    avatar,
                },
                followers {
                    userName,
                    avatar,
                },
                following {
                    userName,
                    avatar,
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
  return data.data.getProfileByName;
};
