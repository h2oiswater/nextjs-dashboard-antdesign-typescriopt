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
import {
  Spec,
  SPEC_TYPE_BASE,
  SPEC_TYPE_MODIFY
} from '../../../../class/goodsTypes'

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
      let imgs = fileList.filter(item => {
          return this.uploadedImgs[item.uid]
      })

      imgs = imgs.map(item => {
        return this.uploadedImgs[item.uid]
      })

      onChange(imgs)
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
                this.uploadedImgs[file.uid] = data.data.objectId
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

const VALIDATE_MSG = '规格中存在空的名称、价格或者存在没有子规格，请检查'
const initialState = {
  specValidateStatus: true
}

type GoodsFormState = Readonly<typeof initialState>

const CollectionCreateForm = Form.create()(
  class GoodsForm extends Component<GoodsFormProps, {}> {
    state: GoodsFormState = initialState

    remove = (k: string) => {
      const { form } = this.props
      let specs = form.getFieldValue('specs') as Array<Spec>
      specs = specs.filter(item => item.objectId !== k)
      form.setFieldsValue({
        specs
      })
    }

    add = () => {
      const { form } = this.props
      form.getFieldDecorator(`specs`, { initialValue: [] })
      const specs = form.getFieldValue('specs') as Array<Spec>
      specs.push({
        objectId: (id++).toString()
      })
      form.setFieldsValue({
        specs
      })
    }

    addSubSpec = (k: string) => {
      const { form } = this.props
      const specs = form.getFieldValue(`specs`) as Array<Spec>
      const thisSpecs = _getSpecs(specs, k)
      const subSpecs = thisSpecs.subSpecs ? thisSpecs.subSpecs : []

      subSpecs.push({
        objectId: (subID++).toString(),
        type: SPEC_TYPE_MODIFY
      })

      let nextSpecs = specs.map(item => {
        if (item.objectId === k) {
          return {
            ...item,
            subSpecs
          }
        }
        return item
      })

      form.setFieldsValue({
        specs: nextSpecs
      })
    }

    removeSubSpec = (k: string, sk: string) => {
      const { form } = this.props
      const specs = form.getFieldValue(`specs`) as Array<Spec>
      const thisSpecs = _getSpecs(specs, k)

      if (!thisSpecs || !thisSpecs.subSpecs) {
        return
      }

      let nextSpecs = specs.map(item => {
        if (item.objectId === k) {
          item.subSpecs = item.subSpecs.filter(item => item.objectId !== sk)
        }
        return item
      })

      form.setFieldsValue({
        specs: nextSpecs
      })
    }

    getSubSpec = (k: string) => {
      const { form } = this.props
      const { getFieldValue } = form

      let specs = getFieldValue(`specs`)
      const thisSpecs = _getSpecs(specs, k)

      if (!thisSpecs.subSpecs) {
        return null
      }
      const subKeys = thisSpecs.subSpecs
      const subFormItems = subKeys.map(sk => (
        <Row gutter={8} key={`${k}${sk.objectId}`}>
          <Col span={8}>
            <Input
              placeholder="子规格名称"
              onChange={e => {
                this.handleValueChanged('name', e.target.value, k, sk.objectId)
              }}
              onBlur={this.handleBlurChanged}
            />
          </Col>
          <Col span={8}>
            <InputNumber
              style={{ width: '100%' }}
              placeholder="子规格价格"
              onChange={e => {
                this.handleValueChanged('price', e, k, sk.objectId)
              }}
              onBlur={this.handleBlurChanged}
            />
          </Col>
          <Col span={8}>
            <Switch
              checkedChildren="基准价"
              unCheckedChildren="修饰价"
              onChange={e => {
                this.handleValueChanged(
                  'type',
                  e ? SPEC_TYPE_BASE : SPEC_TYPE_MODIFY,
                  k,
                  sk.objectId
                )
              }}
            />
            <Icon
              style={{ marginLeft: '8px' }}
              className="dynamic-delete-button"
              type="minus-circle-o"
              onClick={() => this.removeSubSpec(k, sk.objectId)}
            />
          </Col>
        </Row>
      ))
      return subFormItems
    }

    handleValueChanged = (
      key: string,
      value: any,
      id: string,
      subID?: string
    ) => {
      const { form } = this.props
      const { getFieldValue } = form
      const specs = getFieldValue('specs') as Array<Spec>
      const nextSpecs = specs.map(item => {
        if (item.objectId === id) {
          if (!subID) {
            // 更新父规格
            item[key] = value
          } else {
            // 更新子规格
            item.subSpecs = item.subSpecs.map(subItem => {
              if (subItem.objectId === subID) {
                subItem[key] = value
              }
              return subItem
            })
          }
        }
        return item
      })

      form.setFieldsValue({
        specs: nextSpecs
      })
    }

    handleBlurChanged = () => {
      const { form } = this.props
      const { getFieldValue } = form

      const specs = getFieldValue('specs') as Array<Spec>

      let passed = true
      specs.map(item => {
        if (item.subSpecs) {
          item.subSpecs.map(subItem => {
            if (!subItem.name || isNaN(subItem.price)) {
              passed = false
            }
          })
        } else {
          passed = false
        }
        if (!item.name) {
          passed = false
        }
        return item
      })

      this.setState({
        specValidateStatus: passed
      } as GoodsFormState)

      return passed
    }

    render() {
      const { categoryList, visible, onCancel, onOK, form } = this.props
      const { getFieldDecorator, getFieldValue } = form

      getFieldDecorator('specs', { initialValue: [] })
      const specs = getFieldValue('specs') as Array<Spec>

      const formItems = specs.map(k => {
        const subFormItem = this.getSubSpec(k.objectId)
        return (
          <FormItem
            label="规格"
            required={false}
            key={k.objectId}
            validateStatus={this.state.specValidateStatus ? 'success' : 'error'}
            help={this.state.specValidateStatus ? '' : VALIDATE_MSG}
          >
            <Row gutter={8} key={`specRow${k.objectId}`}>
              <Col span={12}>
                <Input
                  placeholder="规格名称"
                  onChange={e => {
                    this.handleValueChanged('name', e.target.value, k.objectId)
                  }}
                  onBlur={this.handleBlurChanged}
                />
              </Col>
              <Col span={12}>
                <Icon
                  className="dynamic-delete-button"
                  type="minus-circle-o"
                  onClick={() => this.remove(k.objectId)}
                />
                <Button
                  type="primary"
                  onClick={() => this.addSubSpec(k.objectId)}
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
        <Modal
          visible={visible}
          onCancel={onCancel}
          onOk={() => {
            if (this.handleBlurChanged()) {
              onOK()
            }
          }}
        >
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
                {getFieldDecorator('price', {
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
              {getFieldDecorator('now', {
                initialValue: true
              })(<Switch defaultChecked />)}
            </FormItem>
          </Form>
        </Modal>
      )
    }
  }
)

function _getSpecs(array: Array<Spec>, id: string): Spec {
  let result = array.filter(item => item.objectId === id)
  return result.length > 0 ? result[0] : null
}

export default CollectionCreateForm
