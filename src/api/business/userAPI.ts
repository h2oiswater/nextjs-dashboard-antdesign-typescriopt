import Router from 'next/router'
import HttpClient from '../iHttpImp'
import { keys, set } from '../../utils/localStorage'

export function login(data: {
  username: string
  password: string
}): Promise<any> {
  return HttpClient.get('/login', data).then(data => {
    set(keys.KEY_TOKEN, data.data.sessionToken)
    Router.replace('/')
    return data.data
  })
}
