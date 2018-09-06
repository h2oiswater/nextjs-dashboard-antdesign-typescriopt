import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://easy-mock.com/mock/5b914817028a6217e24ec13e/example/'
})

export default axiosInstance