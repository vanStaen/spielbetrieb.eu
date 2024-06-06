import axios from "axios";

export const getProfileInfo = async (username) => {
  const requestBody = {
    query: `
        {
            getProfileByName (userName: "${username}"){
              _id,
                isAdmin,
                adminRoles,
                isPartner,
                partnerRoles,
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
                interests,
                lastActive,
                archived,
                usernameChange,
                comments {
                    _id,
                },
                events {
                    _id,
                },
                messages {
                    _id,
                },
                notifications {
                    _id,
                },
                photos {
                    _id,
                },
                visitors {
                    _id,
                },
                friends {
                    userName,
                    avatar,
                    isPartner,
                },
                friendrequests {
                    userName,
                    avatar,
                    isPartner,
                },
                followers {
                    userName,
                    avatar,
                    isPartner,
                },
                following {
                    userName,
                    avatar,
                    isPartner,
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
