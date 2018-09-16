import React from 'react'
import { Layout, Form, Select, InputNumber, DatePicker, Switch, Slider, Button } from 'antd'
import Link from 'next/link'
import { connect } from 'react-redux'
import WithDva from 'dva-utils/store'

const FormItem = Form.Item
const Option = Select.Option

@WithDva(({common}) => { return {common}})
export default class Index extends React.Component {

  render () {
    const { dispatch } = this.props
    const { msg } = this.props.common
    return (
      <Layout>
        <div style={{ marginTop: 100 }}>
          <Form layout='horizontal'>
            <FormItem
              label='Input Number'
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 8 }}
            >
              <InputNumber size='large' min={1} max={10} style={{ width: 100 }} defaultValue={3} name='inputNumber' />
              <a href='#'>Link</a>
            </FormItem>

            <FormItem
              label='Switch'
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 8 }}
            >
              <Switch defaultChecked name='switch' />
            </FormItem>

            <FormItem
              label='Slider'
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 8 }}
            >
              <Slider defaultValue={70} />
            </FormItem>

            <FormItem
              label='Select'
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 8 }}
            >
              <Select size='large' defaultValue='lucy' style={{ width: 192 }} name='select'>
                <Option value='jack'>jack</Option>
                <Option value='lucy'>lucy</Option>
                <Option value='disabled' disabled>disabled</Option>
                <Option value='yiminghe'>yiminghe</Option>
              </Select>
            </FormItem>

            <FormItem
              label='DatePicker'
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 8 }}
            >
              <DatePicker name='startDate' />
            </FormItem>
            <FormItem
              style={{ marginTop: 48 }}
              wrapperCol={{ span: 8, offset: 8 }}
            >
              <Button size='large' type='primary' htmlType='submit'
                onClick={() => {
                  dispatch({
                    type: 'common/updateMsg', 
                    msg: 'confirm'
                  })
                }}
              >
              OK
              </Button>
              
              <Link href='/api'>
                <Button size='large' style={{ marginLeft: 8 }}>
                {msg}
                </Button>
              </Link>
            </FormItem>
          </Form>
        </div>
      </Layout>
    )
  }
}