import React, { Component } from 'react'
import { Card } from 'antd'
const { Meta } = Card

export default class Item extends Component {
  render() {
    return (
      <Card
        style={{ width: 240 }}
        cover={
          <img
            draggable={false}
            alt="example"
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1539053797&di=6cf97cb3dbdb85da447b75c1f2aef921&imgtype=jpg&er=1&src=http%3A%2F%2Fpic40.photophoto.cn%2F20160807%2F1155115790822404_b.jpg"
          />
        }
      >
        <Meta title="牛肉披萨" description="规格：9寸/10寸" />
        <Meta description="售价：32元/64元" />
      </Card>
    )
  }
}
