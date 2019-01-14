import React, { Component } from 'react'
import { Button, Input } from 'antd'
const Search = Input.Search

import './ToolBar.style.less'

interface ToolBarButton {
  text: String
  id: number
}

interface ToolBarProps {
  showButtons: Array<ToolBarButton>
  onButtonClicked: Function
  search: any
}

export default class ToolBar extends Component<ToolBarProps, any> {
  state = {
    currentSearchKey: ''
  }

  render() {
    return (
      <div className="container">
        {this.props.showButtons.map((item, index) => {
          return (
            <Button
              key={index}
              className="button"
              onClick={() => {
                this.props.onButtonClicked(item.id)
              }}
            >
              {item.text}
            </Button>
          )
        })}
        <div className="space" />
        <Search
          className="search"
          placeholder="input search text"
          enterButton="Search"
          size="large"
          value={this.state.currentSearchKey}
          onChange={e => {
            this.setState({
              currentSearchKey: e.currentTarget.value
            })
          }}
          onSearch={value => {
            this.props.search(value)
            this.setState({
              currentSearchKey: ''
            })
          }}
        />
      </div>
    )
  }
}
