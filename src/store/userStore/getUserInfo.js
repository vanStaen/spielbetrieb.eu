export const getUserInfo = async () => {
  const graphqlQuery = {
    query: `
            {
              getUser {
                id,
                isAdmin,
                adminRoles,
                firstName,
                lastName,
                userName,
                email,
                avatar,
                emailSettings,
                profilSettings,
                verifiedIdentity,
                language,
                gender,
                orientation,
                location,
                coordinates,
                birthday,
                lastActive,
                archived,
                usernameChange,
                messages {
                    id,
                },
                notifications {
                  id,
                  userId,
                  photoLinkId,
                  userLinkId,
                  eventLinkId,
                  mediaUrl,
                  data,
                  actionData,
                  type,
                  seen,
                  createdAt,
                  updatedAt,
                }
                visitors {
                    id,
                },
                friends {
                    id,
                    userName,
                    avatar,
                },
                followers {
                    id
                    userName,
                    avatar,
                },
                following {
                    id,
                    userName,
                    avatar,
                },
                friendrequests {
                    id,
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
  return data.data.getUser;
};
