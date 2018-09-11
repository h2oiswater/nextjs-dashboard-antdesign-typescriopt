import Head from 'next/head'
import React from 'react'

export default class extends React.Component {
  render() {
    return (
      <div>
        <Head>
          <title>Next</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <p>about us</p>
      </div>
    )
  }
}