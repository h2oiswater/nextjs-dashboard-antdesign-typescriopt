import { AVFile } from './goodsTypes'
export interface Store {
  objectId?: string
  name: string
  logo: AVFile
  owner: AVUser
}

export interface Notifaction {
  objectId?: string
  title: string
  cover: AVFile
  content: string
}

export interface AVUser {
  updatedAt: Date
  objectId: string
  username: string
  createdAt: Date
  emailVerified: boolean
  mobilePhoneVerified: boolean
}
