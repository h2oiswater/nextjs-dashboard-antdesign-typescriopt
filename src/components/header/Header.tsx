import React from 'react'
import Router from 'next/router'
import { Icon, Tooltip, Avatar, Menu, Dropdown } from 'antd'
import './header.less'

import WithDva from 'dva-utils/store'

const menu = (
  <Menu>
    <Menu.Item>
      <p>
        <Icon type='user' /><a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">1st menu item</a>
      </p>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">2nd menu item</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">3rd menu item</a>
    </Menu.Item>
  </Menu>
);

@WithDva(({router}) => { return {router}})
export default class Header extends React.Component {

  render() {
    return (
      <div className="header">
        <Tooltip title="使用文档">
          <a
            target="_blank"
            href="https://pro.ant.design/docs/getting-started"
            rel="noopener noreferrer"
            title="使用文档"
          >
            <Icon type="question-circle-o" />
          </a>
        </Tooltip>
        <Dropdown overlay={menu} placement="bottomCenter">
          <div>
            <Avatar size='small' icon='user' style={{margin: 5}} />
            王闪火
          </div>
        </Dropdown>
      </div>
    )
  }
}