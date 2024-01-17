import axios from "axios";

export async function addSubscriber(values) {

  const {
    username,
    email,
    language,
    about,
    lists,
    interests
  } = values;

  const requestBody = {
    query: `
            mutation (
                $username: String, 
                $email: String, 
                $language: String, 
                $about: String,
                lists: [String],
                interests: [String],
              ) {
              addSubscriber(
                subscriberInput: { 
                  username: $username,
                  email: $email,
                  language: $language,
                  about: $about,
                  lists: $lists,
                  interests: $interests,
                  }
              ) {
                _id
              }
            }
            `,
    variables: {
      username,
      email,
      language,
      about,
      lists,
      interests,
    },
  };

  const response = await axios({
    url: process.env.API_URL + `/graphql`,
    method: "POST",
    data: requestBody,
  });

  return response;
}
