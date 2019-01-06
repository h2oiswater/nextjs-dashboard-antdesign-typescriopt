import React from 'react'
import { Form, Pagination } from 'antd'
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
import { MODEL_API } from '../../../model/api'
import { API_CLASS_NAME } from '../../../constants/className'

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
  goods: GoodsState,
  api: MODEL_API
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

@WithDva(({ api, }: { api: MODEL_API }) => {
  return { api }
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
      type: 'api/getList',
      payload: {
        className: API_CLASS_NAME.CATEGORY
      }
    })
  }

  render() {
    let categoryList = this.props.api[API_CLASS_NAME.CATEGORY + 'List']
    categoryList = categoryList ? categoryList : []

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
          <Pagination defaultCurrent={1} total={50} />
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

      let good: Goods = {
        title: values.name,
        desc: values.des,
        cid: values.type,
        spec: values.specs,
        display: values.now,
        images: values.imageList,
        price: values.price
      }

      dispatch({
        type: 'api/create',
        payload: {
          params: good,
          className: API_CLASS_NAME.GOODS
        }
      })

      form.resetFields()

      this.handleDialogOnCancel()
    })
  }
}

const showEditDialog = (isShow: boolean) => ({
  isEditDialogShow: isShow
})
