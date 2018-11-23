import React from 'react'
import Dashboard from '@layouts/Dashboard'
import WithDva from 'dva-utils/store'
import { Table, Button, Modal, Form, Input, Popconfirm } from 'antd'
import './list.less'
import Category from '../../../class/Category'
const FormItem = Form.Item

interface CollectionCreateFormProps {
  visible: boolean
  onCancel: any
  onCreate: any
  form: any
  currentCategory: Category
}
const CollectionCreateForm = Form.create()(
  class extends React.Component<CollectionCreateFormProps, any> {
    render() {
      const { visible, onCancel, onCreate, form } = this.props
      const { getFieldDecorator } = form
      return (
        <Modal
          visible={visible}
          title="新建分类"
          okText="新建"
          cancelText="取消"
          onCancel={onCancel}
          onOk={onCreate}
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
            <FormItem label="排序">
              {getFieldDecorator('sort')(<Input />)}
            </FormItem>
          </Form>
        </Modal>
      )
    }
  }
)

interface CategoryListPageProps {
  goods: any
  dispatch: any
}

@WithDva(({ goods }) => {
  return { goods }
})
export default class CategoryListPage extends React.Component<
  CategoryListPageProps,
  any
> {
  state = {
    visible: false
  }

  constructor(props) {
    super(props)
    console.log('constructor')
  }

  componentDidMount() {
    const { dispatch } = this.props

    dispatch({
      type: 'goods/getCategoryList'
    })
  }

  showModal = (item: Category) => {
    const { dispatch } = this.props
    if (item) {
      dispatch({ type: 'goods/updateCurrentCategory', payload: item })
      // set value
      if (this.formRef) {
        this.formRef.props.form.setFieldsValue({
          name: item.name,
          sort: item.sort
        })
      }
    }

    this.setState({ visible: true })
  }

  handleTableChange = (pagination, filters, sorter) => {
    const { dispatch } = this.props
    let current = pagination.current
    dispatch({
      type: 'goods/getCategoryList',
      payload: current
    })
  }

  handleCancel = () => {
    this.setState({ visible: false })
  }

  handleDelete = item => {
    const { dispatch } = this.props
    dispatch({ type: 'goods/deleteCategory', payload: item })
  }

  handleCreate = () => {
    const form = this.formRef.props.form
    form.validateFields((err, values) => {
      if (err) {
        return
      }

      const { dispatch } = this.props

      let category: Category = {
        name: values.name,
        sort: values.sort
      }

      dispatch({
        type: 'goods/createCategory',
        payload: category
      })

      console.log('Received values of form: ', values)

      form.resetFields()
      this.setState({ visible: false })
    })
  }

  saveFormRef = formRef => {
    this.formRef = formRef
  }

  columns = () => {
    return [
      { title: 'ID', dataIndex: 'objectId', key: 'objectId' },
      { title: '名称', dataIndex: 'name', key: 'name' },
      { title: '排序', dataIndex: 'sort', key: 'sort' },
      {
        title: '操作',
        dataIndex: '',
        key: 'x',
        render: item => (
          <p>
            <a
              onClick={() => {
                this.showModal(item)
              }}
            >
              编辑
            </a>
            <Popconfirm
              title="您确认删除该分类了吗？"
              onConfirm={() => {
                this.handleDelete(item)
              }}
              okText="确定"
              cancelText="取消"
            >
              <a style={{ marginLeft: 10 }}>删除</a>
            </Popconfirm>
          </p>
        )
      }
    ]
  }

  render() {
    const { categoryList, currentCategory, categoryCount } = this.props.goods

    return (
      <Dashboard>
        <div>
          <Button type="primary" onClick={this.showModal}>
            新建
          </Button>
          <Table
            className="table"
            columns={this.columns()}
            dataSource={categoryList}
            pagination={{
              total: categoryCount
            }}
            rowKey={(item: Category) => {
              return item.objectId
            }}
            onChange={this.handleTableChange}
          />
          <CollectionCreateForm
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
            currentCategory={currentCategory}
          />
        </div>
      </Dashboard>
    )
  }
}
