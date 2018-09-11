import React from 'react'
import Footer from '../../components/footer'
import Header from '../../components/header'
import Menu from '../../components/menu'

export default class extends React.Component {

  render() {
    return (
      <div>
        <Header></Header>
        <Menu></Menu>
        {
          this.props.children
        }
        <Footer/>
      </div>
    )
  }
}