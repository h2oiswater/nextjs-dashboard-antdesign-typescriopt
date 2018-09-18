import React from 'react'
import { Layout } from 'antd'
import Menu from '../components/Menu'

const { Header, Footer, Sider, Content } = Layout

export default class ApiPage extends React.Component {
  render () {
    return (
      <div>
        <Layout>
          <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}
            theme='light'
          >
            <Menu />
          </Sider>
          <Layout style={{ marginLeft: 200 }}>
            <Header>Header</Header>
            <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
              {this.props.children}
            </Content>
            <Footer>Footer</Footer>
          </Layout>
        </Layout>
      </div>
    )
  }
}