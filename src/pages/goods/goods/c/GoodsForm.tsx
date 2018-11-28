import React, { Component } from 'react'
import { Form, Upload, Icon, Modal, Input, Select, Switch } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import axios from 'axios'
import { getUploadUrl } from '../../../../api/constants'
import Category from '../../../../class/Category'
const FormItem = Form.Item
const Option = Select.Option

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

const CollectionCreateForm = Form.create()(
  class GoodsForm extends Component<GoodsFormProps, {}> {
    state = {
      hasPics: false
    }

    render() {
      const { categoryList, visible, onCancel, onOK, form } = this.props
      const { getFieldDecorator } = form

      return (
        <Modal visible={visible} onCancel={onCancel} onOk={onOK}>
          <Form>
            <FormItem
              label="商品图片"
              validateStatus={this.state.hasPics ? 'success' : 'error'}
              help={this.state.hasPics ? '默认第一张图片为主图哦' : '商品图片必传哦'}
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
