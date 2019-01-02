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
  InputNumber,
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
  onChange?: Function
}

// note
// 自定义或第三方的表单控件，也可以与 Form 组件一起使用。只要该组件遵循以下的约定：
// 提供受控属性 value 或其它与 valuePropName 的值同名的属性。
// 提供 onChange 事件或 trigger 的值同名的事件。
// 不能是函数式组件。
class PicturesWall extends React.Component<PicturesWallProps, any> {
  private uploadedImgs = {}

  static getDerivedStateFromProps(nextProps) {
    // Should be a controlled component.
    if ('imageList' in nextProps) {
      return {
        ...(nextProps.value || [])
      }
    }
    return null
  }

  constructor(props) {
    super(props)

    const imageList = props.imageList || []
    this.state = {
      fileList: imageList,
      previewVisible: false,
      previewImage: ''
    }
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

    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange
    if (onChange) {
      const [...newFileList] = fileList
      onChange(newFileList)
    }
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
      form.getFieldDecorator(`specs`, { initialValue: [] })
      const specs = form.getFieldValue('specs')
      const nextSpecs = specs.push({
        id: id++
      })
      // can use data-binding to set
      // important! notify form to detect changes
      form.setFieldsValue({
        specs: nextSpecs
      })
    }

    addSubSpec = k => {
      const { form } = this.props
      form.getFieldDecorator(`specs`, { initialValue: [] })
      let specs = form.getFieldValue(`specs`)
      console.log(TAG, specs)

      specs = specs ? specs : {}
      const keys = specs[k].keys ? specs[k].keys : ''
      const nextKeys = keys.concat(++subID)
      // can use data-binding to set
      // important! notify form to detect changes
      specs[k].subSpecsKeys = nextKeys
      console.log(TAG, specs)
      form.setFieldsValue({
        specs
      })
    }

    removeSubSpec = (k: number, sk: number) => {
      const { form } = this.props
      // can use data-binding to get
      let specs = form.getFieldValue(`specs`)

      specs.filter(key => {
        console.log(TAG, key)
        return key !== sk
      })

      // can use data-binding to set
      // form.setFieldsValue(result)
    }

    getSubSpec = k => {
      const { form } = this.props
      const { getFieldDecorator, getFieldValue } = form

      let specs = getFieldValue(`specs`)
      specs = specs ? specs : {}
      const subKeys = specs[k].subSpecsKeys ? specs[k].subSpecsKeys : []

      const subFormItems = subKeys.map((sk: number) => (
        <Row gutter={8} key={`${k}${sk}`}>
          <Col span={8}>
            {getFieldDecorator(`specs[${k}]subSpecsKeys[${sk}][name]`, {
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
            {getFieldDecorator(`specs[${k}]subSpecsKeys[${sk}][price]`, {
              validateTrigger: ['onChange', 'onBlur'],
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: '请输入价格'
                }
              ]
            })(
              <InputNumber style={{ width: '100%' }} placeholder="子规格价格" />
            )}
          </Col>
          <Col span={8}>
            {getFieldDecorator(`specs[${k}]subSpecsKeys[${sk}][isBase]`, {
              valuePropName: 'checked',
              initialValue: false
            })(<Switch checkedChildren="基准价" unCheckedChildren="修饰价" />)}
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
                {getFieldDecorator(`specs[${k}][name]`, {
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
            <FormItem label="商品图片">
              {getFieldDecorator('imageList', {
                initialValue: [],
                rules: [
                  {
                    required: true,
                    message: '至少上传一张商品图片'
                  }
                ]
              })(<PicturesWall />)}
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
                {getFieldDecorator(`price`, {
                  validateTrigger: ['onChange', 'onBlur'],
                  rules: [
                    {
                      required: true,
                      whitespace: true,
                      message: '请输入价格'
                    }
                  ]
                })(
                  <InputNumber
                    style={{ width: '100%' }}
                    placeholder="商品价格"
                  />
                )}
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
              {getFieldDecorator('type', {
                rules: [{ required: true, message: '选商品分类啊' }]
              })(<Switch defaultChecked />)}
            </FormItem>
          </Form>
        </Modal>
      )
    }
  }
)

export default CollectionCreateForm
