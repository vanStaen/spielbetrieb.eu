export const postAddUser = async (
  firstName,
  lastName,
  userName,
  email,
  password,
  birthday,
  language,
) => {
  const graphqlQuery = {
    query: `mutation ( $firstName: String, 
                       $lastName: String, 
                       $userName: String, 
                       $email: String, 
                       $password: String,
                       $birthday: Float,
                       $language: String ) {
                addUser (
                    userInput: { 
                        firstName: $firstName, 
                        lastName: $lastName,
                        userName: $userName, 
                        email: $email, 
                        password: $password,
                        birthday: $birthday, 
                        language: $language,
                        }
                    ) {
                    id
                    email
                    }
                }`,
    variables: {
      firstName,
      lastName,
      userName,
      email,
      password,
      birthday,
      language,
    },
  };

  const headers = {
    "content-type": "application/json",
  };

  const endpoint = process.env.API_URL + "/graphql";

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
  return data.data.addUser;
};
