import axios from 'axios'

export function login(data: {
  username: string
  password: string
}): Promise<any> {
  return axios.post('/api/login', {
    data: {
      username: data.username,
      password: data.password
    }
  })
}
