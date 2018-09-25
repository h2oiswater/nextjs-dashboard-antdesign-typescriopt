import React from 'react'
import './login.less'
import WithDva from 'dva-utils/store'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
const FormItem = Form.Item

@WithDva(({ user }) => {
  return { user }
})
@Form.create()
export default class NormalLoginForm extends React.Component {
  props: {
    form: any
  }

  handleSubmit = e => {
    e.preventDefault()

    // const { dispatch } = this.props
    console.log(this.props)

    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        // dispatch({
        //   type: 'user/login',
        //   payload: {
        //     username: values.username,
        //     password: values.password
        //   }
        // })
      }
    })
  }

  componentDidMount() {
    const { form } = this.props
    console.log('form = ')
    console.log(form)
  }

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <div className="login-container">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('username', {
              rules: [
                { required: true, message: 'Please input your username!' }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="Username"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: 'Please input your Password!' }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="password"
                placeholder="Password"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true
            })(<Checkbox>Remember me</Checkbox>)}
            <a className="login-form-forgot" href="">
              Forgot password
            </a>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            Or <a href="">register now!</a>
          </FormItem>
        </Form>
      </div>
    )
  }
}

// const WrappedNormalLoginForm = Form.create()(NormalLoginForm)

// export default WrappedNormalLoginForm
