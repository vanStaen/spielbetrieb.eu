export async function addSubscriber(values) {
  const { username, email, language, about, lists, interests } = values;

  const graphqlQuery = {
    query: `
            mutation (
                $username: String, 
                $email: String, 
                $language: String, 
                $about: String,
                $lists: [String],
                $interests: [String],
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

  const headers = {
    "content-type": "application/json",
  };

  const endpoint = process.env.API_URL + `/graphql`;

  const options = {
    method: "POST",
    headers,
    body: JSON.stringify(graphqlQuery),
  };

  const response = await fetch(endpoint, options);
  const data = await response.json();

  if (data.errors) {
    return data.errors[0];
  }
  return data.data;
}
