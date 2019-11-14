import React, { Component } from 'react';
import { Form, Input, Select } from 'antd';
import { connect } from 'react-redux'
import { getRoles } from '../../redux/action-creators.js'
import PropTypes from 'prop-types'
const Item = Form.Item;
const Option = Select.Option;

@connect(state => ({ roles: state.roles }), null)
@Form.create()
class AddUserForm extends Component {
  constructor(props){
    super(props)
    this.props.setAdd(this.props.form)
  }
  // 设置父级组件传给子级组件的数据的类型及是否是必须的
  static propTypes={
    setAdd:PropTypes.func.isRequired
  }
 
  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form>
        <Item label='用户名' labelCol={{ span: 6 }} wrapperCol={{ span: 15 }}>
          {
            getFieldDecorator(
              'username', {
              rules: [{ required: true, message: '请输入用户名' }],
            }
            )(
              <Input placeholder='请输入用户名' />
            )
          }
        </Item>
        <Item label='密码' labelCol={{ span: 6 }} wrapperCol={{ span: 15 }}>
          {
            getFieldDecorator(
              'password', {
              rules: [{ required: true, message: '请输入密码' }],
            }
            )(
              <Input placeholder='请输入密码' type='password' />
            )
          }
        </Item>
        <Item label='手机号' labelCol={{ span: 6 }} wrapperCol={{ span: 15 }}>
          {
            getFieldDecorator(
              'phone', {
              rules: [{ required: true, message: '请输入手机号' }],
            }
            )(
              <Input placeholder='请输入手机号' />
            )
          }
        </Item>
        <Item label='邮箱' labelCol={{ span: 6 }} wrapperCol={{ span: 15 }}>
          {
            getFieldDecorator(
              'email', {
              rules: [{ required: true, message: '请输入邮箱' }],
               // { pattern: /^[a-zA-Z0-9-_.]+[@][0-9a-zA-Z-_.]+([.][a-zA-Z]+){1,2}$/, message: '请输入正确的邮箱地址' }


                // /\d{6}/
                // [0-9]{6}
                // [0-9][0-9][0-9][0-9][0-9][0-9]

                // /([1]([3]|[5])[0-9])||([1][4][7])/
                // /[1]\d{10}/

              //  / [\u4e00-\u9fa5]{2,6}/
            }
            )(
              <Input placeholder='请输入邮箱' />
            )
          }
        </Item>
        <Item label='角色' labelCol={{ span: 6 }} wrapperCol={{ span: 15 }}>
          {
            getFieldDecorator(
              'roleId', {
              rules: [{ required: true, message: '请选择分类' }],
            }
            )(
              <Select placeholder='请选择分类'>
                {
                  this.props.roles.map(role => {
                    return <Option key={role._id} value={role._id}>{role.name}</Option>
                  })
                }
              </Select>
            )
          }
        </Item>
      </Form>
    )
  }
}

export default AddUserForm;