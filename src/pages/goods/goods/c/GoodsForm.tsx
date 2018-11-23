import React, { Component } from 'react'
import { Form, Upload, Icon, Modal, Input, Select, Switch } from 'antd'
const FormItem = Form.Item
const Option = Select.Option
import axios from 'axios'
import { getUploadUrl } from '../../../../api/constants'

class PicturesWall extends React.Component {
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

  handleChange = ({ fileList }) => this.setState({ fileList })

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

type GoodsFormProps = {
  visible: boolean
  onCancel(): void
}

export default class GoodsForm extends Component<GoodsFormProps, {}> {
  render() {
    return (
      <Modal visible={this.props.visible} onCancel={this.props.onCancel}>
        <Form>
          <FormItem label="商品图片">
            <PicturesWall />
          </FormItem>
          <FormItem label="商品名称">
            <Input />
          </FormItem>
          <FormItem label="商品描述">
            <Input />
          </FormItem>
          <FormItem label="商品分类">
            <Select placeholder="Select a option and change input text above">
              <Option value="male">male</Option>
              <Option value="female">female</Option>
            </Select>
          </FormItem>
          <FormItem label="立即上架">
            <Switch defaultChecked />
          </FormItem>
        </Form>
      </Modal>
    )
  }
}
