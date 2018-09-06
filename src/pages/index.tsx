import Head from 'next/head'
import React from 'react'
import * as styles from '@styles/index/index.scss'

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
      <div className={styles.container}>
        <Head>
          <title>My page title</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <img src='/static/movies.jpg'/>
        <p>{this.props.stars}</p>
      </div>
    )
  }
}