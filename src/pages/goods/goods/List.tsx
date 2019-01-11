import React from 'react'
import { Form, Pagination } from 'antd'
import _ from 'lodash';
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
import { API_CLASS_NAME, DB_GOODS } from '../../../constants/className'
import Category from '../../../class/Category'
import Query from '../../../class/Query'

import './List.style.less'

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

@WithDva(({ api }: { api: MODEL_API }) => {
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

    dispatch({
      type: 'api/getList',
      payload: {
        className: API_CLASS_NAME.GOODS,
        query: {
          include: DB_GOODS.CATEGORY
        } as Query
      }
    })
  }

  render() {
    let categoryList = this.props.api[API_CLASS_NAME.CATEGORY + 'List']
    let goodsList: Array<Goods> = this.props.api[API_CLASS_NAME.GOODS + 'List']
    let categoryCount = this.props.api[API_CLASS_NAME.GOODS + 'Count']

    goodsList = goodsList ? goodsList : []
    categoryList = categoryList ? categoryList : []

    return (
      <Dashboard>
        <div className="content-area">
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
            {goodsList.map(item => (
              <Item
                key={item.objectId}
                data={item}
                onEditClick={this.handleEdit}
                onDeleteClick={this.handleDelete}
              />
            ))}
          </DragSelectContainer>
          <Pagination
            className="page-area"
            defaultCurrent={1}
            total={categoryCount}
            onChange={page => {
              const { dispatch } = this.props
              let current = page

              dispatch({
                type: 'api/getList',
                payload: {
                  className: API_CLASS_NAME.GOODS,
                  params: current
                }
              })
            }}
          />
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

  private handleDialogOnCancel = () => {
    const { dispatch } = this.props

    // 关闭弹窗
    this.setState(showEditDialog(false))

    // 重置表单
    const form = this.formRef.props.form
    form.resetFields()

    // 重置state对象
    dispatch({
      type: 'api/updateCurrent',
      payload: { params: {}, className: API_CLASS_NAME.GOODS }
    })
  }

  private handleEdit = (goods: Goods) => {
    const newGoods = _.cloneDeep(goods)
    const form = this.formRef.props.form
    const { setFieldsValue } = form
    const { dispatch } = this.props

    const images = newGoods.images.map(item => ({
      name: item.name,
      objectId: item.objectId,
      uid: item.objectId,
      url: item.url,
      status: 'done'
    }))

    const { title, desc, price, spec, display } = newGoods

    setFieldsValue({
      title,
      desc,
      price,
      spec,
      display,
      category: goods.category.objectId,
      images
    })

    this.setState(showEditDialog(true))

    dispatch({
      type: 'api/updateCurrent',
      payload: { params: goods, className: API_CLASS_NAME.GOODS }
    })
  }

  private handleDelete = (goods: Goods) => {
    const { dispatch } = this.props
    dispatch({
      type: 'api/delete',
      payload: { params: goods, className: API_CLASS_NAME.GOODS }
    })
  }

  private handleCreate = (category: Category) => {
    const form = this.formRef.props.form
    form.validateFields((err, values) => {
      console.log('Received values of form: ', values)

      if (err) {
        return
      }

      const { dispatch } = this.props

      let goods: Goods = {
        ...values
      }

      let params = {
        ...goods,
        category: {
          __type: 'Pointer',
          className: 'Category',
          objectId: category.objectId
        },
        mainImage: {
          id: values.images[0].objectId,
          __type: 'File'
        }
      }

      dispatch({
        type: 'api/create',
        payload: {
          params: params,
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
