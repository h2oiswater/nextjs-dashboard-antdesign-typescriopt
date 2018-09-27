import axios from 'axios'
import { LEAN_API_ID } from './constants'

const axiosInstance = axios.create({
  baseURL: 'https://api.leancloud.cn/1.1',
  headers: {
    'X-LC-Id': LEAN_API_ID
  }
})

export default axiosInstance
