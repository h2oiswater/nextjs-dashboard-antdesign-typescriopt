import React from 'react'
import { Form } from 'antd'
// @ts-ignore
import Dashboard from '@layouts/Dashboard'
// @ts-ignore
import WithDva from 'dva-utils/store'
import DragSelectContainer from './c/DragSelectContainer'
import ToolBar from './c/ToolBar'
import Item from './c/Item'
import GoodsForm from './c/GoodsForm'

import Goods from '../../../class/Goods'

import { GoodsState } from '../../../model/goods'
import { number } from 'prop-types'

const showButtons = [
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
]

type GoodsListProps = {
  dispatch: any
  goods: GoodsState
}

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

@WithDva(({ goods }) => {
  return { goods }
})
export default class GoodsList extends React.Component<
  GoodsListProps,
  GoodsListStates
> {
  readonly state: State = initialState

  formRef: Form
  saveFormRef = formRef => {
    this.formRef = formRef
  }

  componentDidMount() {
    const { dispatch } = this.props

    dispatch({
      type: 'goods/getCategoryList',
      payload: 'all'
    })
  }

  render() {
    const { categoryList } = this.props.goods

    return (
      <Dashboard>
        <div>
          <ToolBar
            showButtons={showButtons}
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
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.isEditDialogShow}
            categoryList={categoryList}
            onCancel={this.handleDialogOnCancel}
            onOK={this.handleCreate}
          />
        </div>
      </Dashboard>
    )
  }

  private handleDialogOnCancel = () => this.setState(showEditDialog(false))

  private handleCreate = () => {
    const form = this.formRef.props.form
    form.validateFields((err, values) => {
      console.log('Received values of form: ', values)

      if (err) {
        return
      }

      const { dispatch } = this.props

      let good: Goods = {}

      // dispatch({
      //   type: 'goods/createGoods',
      //   payload: good
      // })

      form.resetFields()

      this.handleDialogOnCancel()
    })
  }
}

const showEditDialog = (isShow: boolean) => ({
  isEditDialogShow: isShow
})
