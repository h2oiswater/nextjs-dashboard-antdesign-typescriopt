import React from 'react'
import _ from 'lodash'
// @ts-ignore
import Dashboard from '@layouts/Dashboard'
// @ts-ignore
import ToolBar from '@components/toolbar/ToolBar'
// @ts-ignore
import WithDva from 'dva-utils/store'
import { Modal, Form, Input } from 'antd'
import StoreInfo from './c/StoreInfo'
import { FormComponentProps } from 'antd/lib/form'
import { PicturesWall } from 'src/pages/goods/goods/c/GoodsForm'
import './Info.style.less'
import Category from '../../../class/Category'
import { API_CLASS_NAME, DB_NAME, DB_STORE } from '../../../constants/className'
import { Store } from 'src/class/Store'
import * as APITypes from 'src/class/api'
import { getUser, keys, get, set } from 'src/utils/localStorage'
import Query from 'src/class/Query'
import { CommonState } from 'src/model/common'
const FormItem = Form.Item

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

interface CollectionCreateFormProps extends FormComponentProps {
  visible: boolean
  onCancel: any
  onConfirm(store: Store): void
  currentStore?: Store
}
const CollectionCreateForm = Form.create()(
  class extends React.Component<CollectionCreateFormProps, any> {
    render() {
      const { visible, onCancel, onConfirm, form, currentStore } = this.props
      const { getFieldDecorator } = form
      return (
        <Modal
          visible={visible}
          title="编辑店铺"
          okText="完成"
          cancelText="取消"
          onCancel={onCancel}
          onOk={() => {
            onConfirm(currentStore)
          }}
        >
          <Form layout="vertical">
            <FormItem label="名称">
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: '名称为必填项目'
                  }
                ]
              })(<Input />)}
            </FormItem>
            <FormItem label="店铺Logo">
              {getFieldDecorator('images', {
                initialValue: [],
                rules: [
                  {
                    required: true,
                    message: '上传一张店铺Logo'
                  }
                ]
              })(<PicturesWall />)}
            </FormItem>
          </Form>
        </Modal>
      )
    }
  }
)

interface CategoryListPageProps {
  goods: any
  api: any
  dispatch: any
  common: CommonState
}

@WithDva(({ api, common }) => {
  return { api, common }
})
export default class CategoryListPage extends React.Component<
  CategoryListPageProps,
  any
> {
  state = {
    isEditDialogShow: false,
    currentStoreID: undefined
  }

  formRef: Form

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { dispatch } = this.props

    const user = getUser()

    if (!getUser) return

    dispatch({
      type: 'api/getList',
      payload: {
        className: API_CLASS_NAME.STORE,
        query: {
          where: {
            owner: APITypes.buildPointer({
              className: DB_NAME.User,
              objectId: user.objectId
            })
          },
          include: DB_STORE.LOGO
        } as Query
      }
    })

    this.setState({
      currentStoreID: get(keys.KEY_CURRENT_SOTRE_ID)
    })
  }

  showModal = (item?: Category) => {
    const { dispatch } = this.props
    dispatch({
      type: 'api/updateCurrent',
      payload: { params: item ? item : {}, className: API_CLASS_NAME.CATEGORY }
    })
    // set value
    if (this.formRef) {
      this.formRef.props.form.setFieldsValue({
        name: item ? item.name : '',
        sort: item ? item.sort : ''
      })
    }

    this.setState({ visible: true })
  }

  handleCancel = () => {
    this.setState({ visible: false })
  }

  handleDelete = item => {
    const { dispatch } = this.props
    dispatch({
      type: 'api/delete',
      payload: { params: item, className: API_CLASS_NAME.CATEGORY }
    })
  }

  private handleEdit = (store: Store) => {
    const newStore: Store = _.cloneDeep(store)
    const form = this.formRef.props.form
    const { setFieldsValue } = form
    const { dispatch } = this.props

    const item = newStore.logo
    const images = [
      {
        name: item.name,
        objectId: item.objectId,
        uid: item.objectId,
        url: item.url,
        status: 'done'
      }
    ]

    setFieldsValue({
      name: newStore.name,
      images
    })

    this.setState(showEditDialog(true))

    dispatch({
      type: 'api/updateCurrent',
      payload: { params: newStore, className: API_CLASS_NAME.STORE }
    })
  }

  handleConfirm = () => {
    const form = this.formRef.props.form
    form.validateFields((err, values) => {
      console.log('Received values of form: ', values)

      if (err) {
        return
      }

      const { dispatch } = this.props

      const user = getUser()

      const params: APITypes.CreateStoreParams = {
        name: values.name,
        owner: APITypes.buildPointer({
          className: DB_NAME.User,
          objectId: user.objectId
        }),
        logo: APITypes.buildFile({
          objectId: values.images[0].objectId as string
        })
      }

      dispatch({
        type: 'api/create',
        payload: {
          params: params,
          className: API_CLASS_NAME.STORE
        }
      })

      this.handleDialogOnCancel()
    })
  }

  saveFormRef = formRef => {
    this.formRef = formRef
  }

  render() {
    let storeList = this.props.api[API_CLASS_NAME.STORE + 'List'] as Array<
      Store
    >
    let { currentStoreID } = this.props.common
    if (!currentStoreID) {
      currentStoreID = this.state.currentStoreID
    }

    storeList = storeList ? storeList : []
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

          {storeList.map((item, index) => (
            <StoreInfo
              onModifyButtonClicked={this.handleEdit}
              onDefaultButtonClicked={(store: Store) => {
                const { dispatch } = this.props
                dispatch({
                  type: 'common/updateCurrentStoreID',
                  payload: store.objectId
                })
                set(keys.KEY_CURRENT_SOTRE_ID, store.objectId)
              }}
              isCurrentSotre={currentStoreID === item.objectId}
              key={index}
              data={item}
            />
          ))}
        </div>

        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.isEditDialogShow}
          onCancel={this.handleDialogOnCancel}
          onConfirm={this.handleConfirm}
        />
      </Dashboard>
    )
  }

  private handleDialogOnCancel = () => {
    // 关闭弹窗
    this.setState(showEditDialog(false))

    // 重置表单
    const form = this.formRef.props.form
    form.resetFields()
  }
}

const showEditDialog = (isShow: boolean) => ({
  isEditDialogShow: isShow
})
