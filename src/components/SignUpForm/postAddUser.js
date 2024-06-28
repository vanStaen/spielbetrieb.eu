import axios from "axios";

export const postAddUser = async (
  firstName,
  lastName,
  userName,
  email,
  password,
  birthday,
  language,
) => {
  const requestBody = {
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
    "Content-Type": "application/json",
  };

  try {
    const response = await axios(
      {
        url: process.env.API_URL + "/graphql",
        method: "POST",
        data: requestBody,
      },
      {
        headers,
      },
    );
    return response.data;
  } catch (err) {
    if (err.response.status === 401) {
      throw new Error("Error! Unauthorized(401)");
    }
    return err.response.data;
  }
};
