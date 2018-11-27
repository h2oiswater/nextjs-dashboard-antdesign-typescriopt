import Router from 'next/router'
import { apiGet } from '../api'
import { keys, set } from '../../utils/localStorage'

export function login(params): Promise<any> {
  return apiGet({ url: '/login', params }).then(data => {
    set(keys.KEY_TOKEN, data.sessionToken)
    Router.replace('/')
    return data
  })
}
