import axios from "axios";

// TODO: Create BE endpoint + get rid of Axios
export const getLastTicketId = async () => {
  const apiUrl = process.env.API_URL + "/ticket/lastid";
  return await axios(
    {
      url: apiUrl,
      method: "Get",
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
};
