import Router from 'next/router'
import { apiGet } from '../api'
import { keys, set, setUser, getUser } from '../../utils/localStorage'
import * as APIUserTypes from 'src/class/api/user'
import { AVUser } from 'src/class/Store'

export function login(params): Promise<APIUserTypes.Rep.LoginRep> {
  return apiGet({ url: '/login', params }).then(
    (data: APIUserTypes.Rep.LoginRep) => {
      set(keys.KEY_TOKEN, data.sessionToken)
      setUser(data)
      Router.replace('/')
      return data
    }
  )
}

export function me(): Promise<AVUser> {
  let currentUser = getUser()
  if (!currentUser) {
    Router.replace('/login')
    return
  }
  return apiGet({ url: '/users/'.concat(currentUser.objectId) }).then(
    (data: AVUser) => data
  )
}
