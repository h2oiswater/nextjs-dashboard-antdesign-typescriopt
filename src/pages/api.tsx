import React from 'react'
import WithDva from 'dva-utils/store'
import * as IndexAPI from '../api/business/indexApi'

@WithDva(({common}) => { return {common}})
export default class ApiPage extends React.Component {

  props: {
    stars: string,
    common: any
  }

  static async getInitialProps({}) {
    const rep = await IndexAPI.getIndexData()
    return { stars: JSON.stringify(rep.data) }
  }

  render() {
    const { msg } = this.props.common
    return (
      <div>
        <p>{this.props.stars}</p>
        <p>{msg}</p>
      </div>
    )
  }
}