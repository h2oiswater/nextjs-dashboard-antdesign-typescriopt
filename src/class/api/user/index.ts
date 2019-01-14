import { AVUser } from 'src/class/Store'

export namespace Rep {
  export interface LoginRep extends AVUser{
    sessionToken: string
  }
}
