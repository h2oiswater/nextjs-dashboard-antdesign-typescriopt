import React, { Component } from 'react'
import {
  Form,
  Upload,
  Icon,
  Modal,
  Input,
  Select,
  Switch,
  Button,
  Row,
  Col
} from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import axios from 'axios'
import { getUploadUrl } from '../../../../api/constants'
import Category from '../../../../class/Category'

import './GoodsForm.less'

const FormItem = Form.Item
const Option = Select.Option

const TAG = 'GoodsForm'

type PicturesWallProps = {
  handlePicsChanged: Function
}

class PicturesWall extends React.Component<PicturesWallProps, any> {
  private uploadedImgs = {}

  state = {
    previewVisible: false,
    previewImage: '',
    fileList: []
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    })
  }

  handleChange = ({ fileList }) => {
    this.setState({ fileList })
    this.props.handlePicsChanged(fileList)
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    return (
      <div className="clearfix">
        <Upload
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          customRequest={({ file, onSuccess, onError }) => {
            let formData = new FormData()
            formData.append('file', file)
            axios
              .post(getUploadUrl(file.name), formData, {
                headers: {
                  'X-LC-Id': 'DpnvHL3ttpjzk5UvHnSEedNo-gzGzoHsz',
                  'X-LC-Key': 'vGLWcKIk9nh1udRwF44o1AsS'
                }
              })
              .then(data => {
                this.uploadedImgs[file.uid] = data.data.url
                onSuccess(null, file)
              })
              .catch(() => onError())
          }}
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    )
  }
}

interface GoodsFormProps extends FormComponentProps {
  categoryList: Array<Category>
  visible: boolean
  onCancel(): void
  onOK(): void
}

// 给动态组件用
let id = 0
let subID = 0

const CollectionCreateForm = Form.create()(
  class GoodsForm extends Component<GoodsFormProps, {}> {
    state = {
      hasPics: false
    }

    remove = k => {
      const { form } = this.props
      // can use data-binding to get
      const keys = form.getFieldValue('keys')

      // can use data-binding to set
      form.setFieldsValue({
        keys: keys.filter(key => key !== k)
      })
    }

    add = () => {
      const { form } = this.props
      // can use data-binding to get
      const keys = form.getFieldValue('keys')
      const nextKeys = keys.concat(++id)
      // can use data-binding to set
      // important! notify form to detect changes
      form.setFieldsValue({
        keys: nextKeys
      })
    }

    addSubSpec = k => {
      const { form } = this.props
      form.getFieldDecorator(`specs${k}subSpecsKeys`, { initialValue: [] })
      const keys = form.getFieldValue(`specs${k}subSpecsKeys`)
      console.log(TAG, keys)
      const nextKeys = keys.concat(++subID)
      // can use data-binding to set
      // important! notify form to detect changes
      let result = {}
      result[`specs${k}subSpecsKeys`] = nextKeys
      form.setFieldsValue(result)
    }

    removeSubSpec = (k: number, sk: number) => {
      const { form } = this.props
      // can use data-binding to get
      const keys = form.getFieldValue(`specs${k}subSpecsKeys`)

      let result = {}
      result[`specs${k}subSpecsKeys`] = keys.filter(key => key !== sk)

      // can use data-binding to set
      form.setFieldsValue(result)
    }

    getSubSpec = k => {
      const { form } = this.props
      const { getFieldDecorator, getFieldValue } = form

      getFieldDecorator(`specs${k}subSpecsKeys`, { initialValue: [] })
      const subKeys = getFieldValue(`specs${k}subSpecsKeys`)

      const subFormItems = subKeys.map((sk: number) => (
        <Row gutter={8} key={`${k}${sk}`}>
          <Col span={8}>
            {getFieldDecorator(`specs${k}subSpecs${sk}name`, {
              validateTrigger: ['onChange', 'onBlur'],
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: '请输入规格名称'
                }
              ]
            })(<Input placeholder="子规格名称" />)}
          </Col>
          <Col span={8}>
            {getFieldDecorator(`specs${k}subSpecs${sk}price`, {
              validateTrigger: ['onChange', 'onBlur'],
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: '请输入规格名称'
                }
              ]
            })(<Input placeholder="子规格名称" />)}
          </Col>
          <Col span={8}>
            {getFieldDecorator(`specs${k}subSpecs${sk}isBase`, {
              valuePropName: 'checked',
              initialValue: false
            })(
              <Switch
                checkedChildren="基准价"
                unCheckedChildren="修饰价"
              />
            )}
            <Icon
              style={{ marginLeft: '8px' }}
              className="dynamic-delete-button"
              type="minus-circle-o"
              onClick={() => this.removeSubSpec(k, sk)}
            />
          </Col>
        </Row>
      ))
      return subFormItems
    }

    render() {
      const { categoryList, visible, onCancel, onOK, form } = this.props
      const { getFieldDecorator, getFieldValue } = form

      getFieldDecorator('keys', { initialValue: [] })
      const keys = getFieldValue('keys')
      const formItems = keys.map(k => {
        const subFormItem = this.getSubSpec(k)
        return (
          <FormItem label="规格" required={false} key={k}>
            <Row gutter={8} key={`specRow${k}`}>
              <Col span={12}>
                {getFieldDecorator(`specs[${k}]`, {
                  validateTrigger: ['onChange', 'onBlur'],
                  rules: [
                    {
                      required: true,
                      whitespace: true,
                      message: '请输入规格名称'
                    }
                  ]
                })(<Input placeholder="规格名称" />)}
              </Col>
              <Col span={12}>
                <Icon
                  className="dynamic-delete-button"
                  type="minus-circle-o"
                  onClick={() => this.remove(k)}
                />
                <Button
                  type="primary"
                  onClick={() => this.addSubSpec(k)}
                  style={{ marginLeft: '8px' }}
                >
                  添加子规格
                </Button>
              </Col>
            </Row>
            {subFormItem}
          </FormItem>
        )
      })

      return (
        <Modal visible={visible} onCancel={onCancel} onOk={onOK}>
          <Form>
            <FormItem
              label="商品图片"
              validateStatus={this.state.hasPics ? 'success' : 'error'}
              help={
                this.state.hasPics ? '默认第一张图片为主图哦' : '商品图片必传哦'
              }
              required
            >
              <PicturesWall handlePicsChanged={this.handlePicsChanged} />
            </FormItem>
            <FormItem label="商品名称">
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: '名称为必填项目'
                  }
                ]
              })(<Input />)}
            </FormItem>
            {formItems.length === 0 ? (
              <FormItem label="商品价格">
                {getFieldDecorator('price', {
                  rules: [
                    {
                      required: true,
                      message: '价格为必填项目'
                    }
                  ]
                })(<Input />)}
              </FormItem>
            ) : null}

            {formItems}

            <FormItem>
              <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
                <Icon type="plus" /> 添加规格
              </Button>
            </FormItem>

            <FormItem label="商品描述">
              {getFieldDecorator('des', {
                rules: [
                  {
                    required: true,
                    message: '描述为必填项目'
                  }
                ]
              })(<Input />)}
            </FormItem>

            <FormItem label="商品分类">
              {getFieldDecorator('type', {
                rules: [{ required: true, message: '选商品分类啊' }]
              })(
                <Select placeholder="商品分类">
                  {function() {
                    return categoryList.map(item => {
                      return (
                        <Option key={item.objectId} value={item.objectId}>
                          {item.name}
                        </Option>
                      )
                    })
                  }.call(this)}
                </Select>
              )}
            </FormItem>
            <FormItem label="立即上架">
              <Switch defaultChecked />
            </FormItem>
          </Form>
        </Modal>
      )
    }

    private handlePicsChanged = data => {
      this.setState({
        hasPics: data.length > 0
      })
    }
  }
)

export default CollectionCreateForm
