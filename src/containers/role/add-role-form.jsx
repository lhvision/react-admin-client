import React, { Component } from 'react';
import { Form, Input } from 'antd';
import PropTypes from 'prop-types'
// 引入高阶组件
import {connect} from 'react-redux'

const Item = Form.Item;
@connect(state=>({roles:state.roles}),null)
@Form.create()
class AddRoleForm extends Component {
  // 构造器,初始化数据,把当前组件的form对象传给父级组件
  constructor(props){
    super(props)
    this.props.setAddRoleForm(this.props.form)
  }
  // 设置父级组件传入子级组件的数据的类型及是否是必须的
  static propTypes={
    setAddRoleForm:PropTypes.func.isRequired
  }
  // 表单的验证---自定义校验
  validator = (rule, value, callback) => {
    // 校验
    if(!value) return callback('请输入角色名称')
    // 当前输入的角色名字是否存在
    const result = this.props.roles.find(role=>role.name===value)
    if(result) return callback('角色名称已经存在')
    callback()
  }
  render () {
    const { getFieldDecorator } = this.props.form;
    this.props.setAddRoleForm(this.props.form)
    
    return (
      <Form>
        <Item label='角色名称' labelCol={{span: 6}}  wrapperCol={{span: 15}}>
          {
            getFieldDecorator(
              'name', {
                rules: [{
                  validator: this.validator
                }],
              }
            )(
              <Input placeholder='请输入角色名称'/>
            )
          }
        </Item>
      </Form>
    )
  }
}

export default AddRoleForm;