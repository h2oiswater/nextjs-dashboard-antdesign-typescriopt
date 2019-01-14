import * as React from 'react'

import { Button } from 'antd'

import './StoreInfo.style.less'
import { Store } from 'src/class/Store'

export interface StoreInfoProps {
  data: Store
  isCurrentSotre: boolean
  onDefaultButtonClicked(store: Store): void
  onModifyButtonClicked(store: Store): void
}

export default class StoreInfo extends React.Component<StoreInfoProps, any> {
  state = {
    refresh: false
  }

  public render() {
    const {
      data,
      isCurrentSotre,
      onDefaultButtonClicked,
      onModifyButtonClicked
    } = this.props
    return (
      <div className="store-container">
        <div className="div-info">
          <div className="store-title">店铺名称: {data.name}</div>
          <Button
            onClick={() => {
              onDefaultButtonClicked(data)
            }}
            type={isCurrentSotre ? 'primary' : 'default'}
            className="btn-default-store"
          >
            {isCurrentSotre ? '当前店铺' : '设为当前店铺'}
          </Button>
        </div>

        <img className="store-logo" src={data.logo.url} />

        <Button
          type="primary"
          className="store-save"
          onClick={() => {
            onModifyButtonClicked(data)
          }}
        >
          修改信息
        </Button>
      </div>
    )
  }
}
