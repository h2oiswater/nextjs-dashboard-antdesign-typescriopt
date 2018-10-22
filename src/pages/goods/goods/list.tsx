import React from 'react'
import Dashboard from '@layouts/Dashboard'
import DragSelectContainer from './c/DragSelectContainer'
import ToolBar from './c/ToolBar'
import Item from './c/Item'

export default class GoodsList extends React.Component {
  state = {
    selectedItems: []
  }

  _renderSelectedItemsName = () => {
    let txt = JSON.stringify(this.state.selectedItems)
    return <p>{txt}</p>
  }

  render() {
    return (
      <Dashboard>
        <div>
          <ToolBar />
          <DragSelectContainer
            onSelected={result => {
              this.setState({
                selectedItems: result
              })
            }}
          >
            <Item />
            <Item />
          </DragSelectContainer>
          {this._renderSelectedItemsName()}
        </div>
      </Dashboard>
    )
  }
}
