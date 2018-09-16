import { Layout } from 'antd'

const { Header, Footer, Sider, Content } = Layout

export default ({}) =>
  <div>
    <Layout>
      <Sider>Sider</Sider>
      <Layout>
        <Header>Header</Header>
        <Content>
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  </div>
