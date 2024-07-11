import axios from "axios";

//TODO: getPartner
export const getPartner = async () => {
  const requestBody = {
    query: `
            {
              getPartner {
                id,
                userName,
	              name,
                description,
                avatar,
                pictures,
                settings,
                reviews,
                lastActive,
                partnerRoles,
                partnertype,
                links,
                partnerTags,
                archived,
                suspended,
                pending,
                admin,
                partnerfollowers {
                    id
                    userName,
                    avatar,
                },
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

  return response.data.data.getPartner;
};
