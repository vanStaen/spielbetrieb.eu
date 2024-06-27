import axios from "axios";

export const getUserInfo = async () => {
  const requestBody = {
    query: `
            {
              getUser {
                _id,
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
                    _id,
                },
                notifications {
                  _id,
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
                    _id,
                },
                friends {
                    _id,
                    userName,
                    avatar,
                },
                followers {
                    _id
                    userName,
                    avatar,
                },
                following {
                    _id,
                    userName,
                    avatar,
                },
                friendrequests {
                    _id,
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

  return response.data.data.getUser;
};
