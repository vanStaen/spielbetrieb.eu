import axios from 'axios'

export const postLogin = async (email, username, password, remind) => {
  const requestBody = {
    email,
    username,
    password,
    remind
  }

  try {
    const response = await axios({
      url: process.env.API_URL + '/auth/login/',
      method: 'POST',
      data: requestBody
    })
    return response.data
  } catch (err) {
    if (err.response.status === 401) {
      throw new Error('Error! Unauthorized(401)')
    }
    return err.response.data
  }
}
