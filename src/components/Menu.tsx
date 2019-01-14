import React from 'react'
import { Menu, Icon } from 'antd'

import WithDva from 'dva-utils/store'

const SubMenu = Menu.SubMenu

let id = 0

@WithDva(({ router }) => {
  return { router }
})
export default class Sider extends React.Component {
  handleClick = e => {
    const { dispatch } = this.props
    switch (e.key) {
      case '1':
        dispatch({
          type: 'router/updatePath',
          path: '/store/store/Info'
        })
        break
      case '2':
        dispatch({
          type: 'router/updatePath',
          path: '/store/notification/List'
        })
        break
      case '3':
        dispatch({
          type: 'router/updatePath',
          path: '/goods/category/List'
        })
        break
      case '4':
        dispatch({
          type: 'router/updatePath',
          path: '/goods/goods/List'
        })
        break
    }
    dispatch({
      type: 'router/updateKey',
      key: e.key
    })
  }

  render() {
    const { key } = this.props.router
    return (
      <Menu
        onClick={this.handleClick}
        style={{ textAlign: 'left' }}
        defaultSelectedKeys={key}
        defaultOpenKeys={['sub1', 'sub2', 'sub3']}
        mode="inline"
      >
        <SubMenu
          key="sub1"
          title={
            <span>
              <Icon type="shop" />
              <span>店铺管理</span>
            </span>
          }
        >
          <Menu.Item key="1">店铺信息</Menu.Item>
          <Menu.Item key="2">公告管理</Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub2"
          title={
            <span>
              <Icon type="mail" />
              <span>商品管理</span>
            </span>
          }
        >
          <Menu.Item key="3">分类管理</Menu.Item>
          <Menu.Item key="4">商品管理</Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub3"
          title={
            <span>
              <Icon type="appstore" />
              <span>订单管理</span>
            </span>
          }
        >
          <Menu.Item key="5">订单列表</Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub4"
          title={
            <span>
              <Icon type="setting" />
              <span>供应链管理</span>
            </span>
          }
        >
          <Menu.Item key="5">骑手管理</Menu.Item>
        </SubMenu>
      </Menu>
    )
  }
}
