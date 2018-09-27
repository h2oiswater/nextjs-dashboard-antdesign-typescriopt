import React from 'react'
import { Form, Modal } from 'antd'

interface EditModalProps {
  title: string
  visible: boolean
  onOk: any
  confirmLoading: boolean
  onCancel: any
  data: any // pass to form
}

export function create(SourceForm) {
  let WrappedForm = Form.create()(SourceForm)

  return class extends React.Component {
    props: EditModalProps

    render() {
      return (
        <Modal
          title={this.props.title}
          visible={this.props.visible}
          onOk={this.props.onOk}
          confirmLoading={this.props.confirmLoading}
          onCancel={this.props.onCancel}
        >
          <WrappedForm {...this.props.data} />
        </Modal>
      )
    }
  }
}
