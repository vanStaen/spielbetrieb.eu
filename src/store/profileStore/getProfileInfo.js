import axios from "axios";

export const getProfileInfo = async (username) => {
  const requestBody = {
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

  const response = await axios({
    url: process.env.API_URL + "/graphql",
    method: "POST",
    data: requestBody,
  });

  if ((response.status !== 200) & (response.status !== 201)) {
    throw new Error("Unauthenticated!");
  }

  return response.data.data.getProfileByName;
};
