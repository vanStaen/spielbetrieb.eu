import axios from "axios";
import { notification } from "antd";

export async function updateOrientation(orientation) {
  const requestBody = {
    query: `
    mutation ($orientation: Int!){
      updateUser(
        userInput: {          
          orientation: $orientation,
        }
      ) {
        _id,
      }
    }
    `,
    variables: {
      orientation,
    },
  };

  const response = await axios({
    url: process.env.API_URL + "/graphql",
    method: "POST",
    data: requestBody,
  });
  if ((response.status !== 200) & (response.status !== 201)) {
    notification.error({
      message: "Unauthenticated!",
      placement: "bottomRight",
    });
    throw new Error("Unauthenticated!");
  }
  return true;
}
