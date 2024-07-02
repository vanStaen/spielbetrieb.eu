import axios from "axios";

// TODO: Create BE endpoint + get rid of Axios
export const isTicketValid = async (uuid) => {
    const apiUrl = process.env.API_URL + "/ticket/valid";
    const response = await axios(
        {
            url: apiUrl,
            method: "POST",
            data: {
                uuid: uuid,
            },
        },
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    if ((response.status !== 200) & (response.status !== 201) & (response.status !== 403)) {
        if (response.status === 401) {
            throw new Error(`Error! Unauthorized(401)`);
        } else {
            throw new Error(`Error! Status ${response.status}`);
        }
    }

    return response.data
};