import axios from 'axios'

export function login(username: string, password: string): Promise<any> {
  return axios.post('/api/login', {
    data: {
      username,
      password
    }
  })
}
