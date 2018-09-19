import React from 'react'
import { Layout, Divider } from 'antd'
import Menu from '../components/Menu'
import NovaFooter from '../components//footer/Footer'
import NovaHeader from '../components/header/Header'

const theme = 'light'

const { Header, Footer, Sider, Content } = Layout

export default class ApiPage extends React.Component {
  render () {
    return (
      <div>
        <Layout>
          <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, textAlign: "center" }}
            theme={theme}
          > 
            <div>
              <i className="iconfont icon-logo icon-size-logo"/>
              <p>I am a Logo</p>
            </div>
            <Divider />
            <Menu />
          </Sider>
          <Layout style={{ marginLeft: 200 }}>
            <Header style={{padding: 0}}>
              <NovaHeader />
            </Header>
            <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
              {this.props.children}
            </Content>
            <Footer>
              <NovaFooter />
            </Footer>
          </Layout>
        </Layout>
      </div>
    )
  }
}