import React from 'react'
import { Icon } from 'antd'
import './footer.less'

export default class Header extends React.Component {

  render() {
    return (
      <div className="footer">
        <Icon type="github" theme="outlined" />
        <a href='https://github.com/h2oiswater/nextjs-ts-antd-starter' style={{ margin: 5 }}>Github</a>
      </div>
    )
  }
}