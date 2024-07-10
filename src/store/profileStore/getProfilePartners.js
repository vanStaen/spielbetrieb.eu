import axios from "axios";

export const getProfilePartners = async (id) => {
    const requestBody = {
        query: `
        {
            getProfilePartnersById (id: "${id}"){ 
                id,
                name,
                userName,
                description,
                avatar,
                pending,
                suspended,
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

    return response.data.data.getProfilePartnersById;
};
