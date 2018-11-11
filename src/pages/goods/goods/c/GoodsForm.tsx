import React, { Component } from 'react'
import { Form, Upload, Icon, Modal, Input, Select, Switch } from 'antd'
const FormItem = Form.Item
const Option = Select.Option

class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [
      {
        uid: '-1',
        name: 'xxx.png',
        status: 'done',
        url:
          'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
      }
    ]
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
          action="//jsonplaceholder.typicode.com/posts/"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
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
  onCancel: Function
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
