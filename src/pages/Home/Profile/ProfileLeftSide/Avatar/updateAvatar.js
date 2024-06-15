import axios from "axios";
import { notification } from "antd";

export async function updateAvatar(path) {
  const requestBody = {
    query: `
    mutation ($path: String) {
      updateUser(
        userInput: {
          avatar: $path,
        }
      ) {
        avatar,
      }
    }`,
    variables: {
      path,
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
