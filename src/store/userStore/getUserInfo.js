import axios from 'axios';

export const getUserInfo = async () => {
  const requestBody = {
    query: `
            {
              getUser {
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
                },
                followers {
                    userName,
                    avatar,
                },
                followed {
                    userName,
                    avatar,
                }
              }
            }
          `
  };

  const response = await axios({
    url: process.env.API_URL + '/graphql',
    method: 'POST',
    data: requestBody
  });

  if ((response.status !== 200) & (response.status !== 201)) {
    throw new Error('Unauthenticated!');
  }

  return response.data.data.getUser;
};
