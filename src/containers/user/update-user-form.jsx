import React, { Component } from 'react';
import { Form, Input } from 'antd';
import PropTypes from 'prop-types'
const Item = Form.Item;

@Form.create()
class UpdateUserForm extends Component {
  constructor(props){
    super(props)
    this.props.setUpdate(this.props.form)
  }
  static propTypes={
    setUpdate:PropTypes.func.isRequired
  }
  render () {
    const { form : { getFieldDecorator } } = this.props;

    return (
      <Form>
        <Item label='密码' labelCol={{span: 6}}  wrapperCol={{span: 15}}>
          {
            getFieldDecorator(
              'password',
              {
                rules: [
                  {
                    required: true, message: '必须输入内容',
                  },
                  {
                    min: 4, message: '最小不能小于4位'
                  }
                ]
              }
            )(
              <Input placeholder='请输入密码' type='password'/>
            )
          }
        </Item>
        <Item label='确认密码' labelCol={{span: 6}}  wrapperCol={{span: 15}}>
          {
            getFieldDecorator(
              'rePassword',
              {
                rules: [
                  {required: true, message: '必须输入内容'},
                  {
                    min: 4, message: '最小不能小于4位'
                  }
                ]
              }
            )(
              <Input placeholder='请确认密码' type='password'/>
            )
          }
        </Item>
      </Form>
    )
  }
}

export default UpdateUserForm;