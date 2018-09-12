import Link from 'next/link'

import React from 'react'
import '@styles/index/index.scss'

import * as IndexAPI from '../api/indexApi'

export default class extends React.Component {

  props: {
    stars: string
  }

  static async getInitialProps({}) {
    const rep = await IndexAPI.getIndexData()
    return { stars: JSON.stringify(rep.data) }
  }

  render() {
    return (
      <div className="container">
        <img src='/static/movies.jpg'/>
        <p>{this.props.stars}</p>
        <Link href='/about'>about us</Link>
      </div>
    )
  }
}