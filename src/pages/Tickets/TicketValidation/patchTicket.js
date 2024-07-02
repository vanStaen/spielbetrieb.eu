import axios from "axios";

// TODO: Create BE endpoint + get rid of Axios
export const patchTicket = async (uuid) => {
    const apiUrl = process.env.API_URL + "/ticket";
    const response = await axios(
        {
            url: apiUrl,
            method: "PATCH",
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

    return true
};