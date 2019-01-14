import React from 'react'
import Dashboard from '../layouts/Dashboard'
// @ts-ignore
import WithDva from 'dva-utils/store'

import { UserState } from 'src/model/user'

type IndexPageProps = { dispatch: any; user: UserState }

@WithDva(({ user }: { user: UserState }) => {
  return { user }
})
export default class IndexPage extends React.Component<IndexPageProps, any> {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'user/me'
    })
  }

  render() {
    const { user } = this.props.user

    return (
      <Dashboard>
        <p>{user ? user.username : ''}你好！</p>
      </Dashboard>
    )
  }
}
