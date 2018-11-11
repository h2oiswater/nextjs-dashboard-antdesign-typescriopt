import React from 'react'
import Dashboard from '@layouts/Dashboard'
import DragSelectContainer from './c/DragSelectContainer'
import ToolBar from './c/ToolBar'
import Item from './c/Item'
import GoodsForm from './c/GoodsForm'

type GoodsListProps = {}

type GoodsListStates = {
  selectedItems: Array<object>
  isMutilSelect: boolean
  isEditDialogShow: boolean
}

const initialState = {
  selectedItems: [],
  isMutilSelect: false,
  isEditDialogShow: false
}
type State = Readonly<typeof initialState>

export default class GoodsList extends React.Component<
  GoodsListProps,
  GoodsListStates
> {
  readonly state: State = initialState

  render() {
    return (
      <Dashboard>
        <div>
          <ToolBar
            showButtons={[
              {
                id: 1,
                text: 'New'
              },
              {
                id: 2,
                text: 'Edit'
              },
              {
                id: 3,
                text: 'Delete'
              },
              {
                id: 4,
                text: 'Unselect All'
              }
            ]}
            onButtonClicked={id => {
              switch (id) {
                case 1:
                  this.setState({
                    isEditDialogShow: true
                  })
                  break
              }
            }}
            search={key => alert(key)}
          />
          <DragSelectContainer
            enable={this.state.isMutilSelect}
            onSelected={result => {
              this.setState({
                selectedItems: result
              })
            }}
          >
            <Item isSelected={false} />
          </DragSelectContainer>
          <GoodsForm
            visible={this.state.isEditDialogShow}
            onCancel={this.handleDialogOnCancel}
          />
        </div>
      </Dashboard>
    )
  }

  private handleDialogOnCancel = () => this.setState(showEditDialog(false))
}

const showEditDialog = (isShow: boolean) => ({
  isEditDialogShow: isShow
})
