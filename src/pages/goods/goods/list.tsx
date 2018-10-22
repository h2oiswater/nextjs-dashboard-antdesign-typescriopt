import React from 'react'
import Dashboard from '@layouts/Dashboard'
import DragSelectContainer from './c/DragSelectContainer'
import ToolBar from './c/ToolBar'
import Item from './c/Item'

export default class GoodsList extends React.Component {
  render() {
    return (
      <Dashboard>
        <div>
          <ToolBar />
          <DragSelectContainer>
            <Item />
            <Item />
          </DragSelectContainer>
        </div>
      </Dashboard>
    )
  }
}
