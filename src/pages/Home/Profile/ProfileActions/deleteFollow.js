import axios from "axios";

export const deleteFollow = async (followingId) => {
  const requestBody = {
    following: followingId,
  };

  try {
    const response = await axios({
      url: process.env.API_URL + "/social/follow/",
      method: "DELETE",
      data: requestBody,
    });
    return response.data;
  } catch (err) {
    if (err.response.status === 401) {
      throw new Error("Error! Unauthorized(401)");
    }
    return err.response.data.success;
  }
};
