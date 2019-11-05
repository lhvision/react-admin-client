import React, { Component } from 'react';
// 引入样式
import './Login.less'
// 引入axios
import axios from 'axios'
// 引入图片
import logo from './images/logo.png'
import { Form, Icon, Input, Button, message } from 'antd';
// 引入connect
import { connect } from 'react-redux'
// 引入action
import { saveUser } from '../../redux/action-creators.js'
// 引入接口文件

const Item = Form.Item
@connect(null, {
  saveUser
})
@Form.create()
class Login extends Component {
  handleSubmit = e => {
    // 阻止事件的默认行为
    e.preventDefault();
    // 表单的验证是否都通过了!
    this.props.form.validateFields((error, values) => {
      // values是一个对象--可以直接获取表单中的数据
      // 错误 
      if (!error) {
         // message.sussess('表单验证成功')
         // 获取账户和密码
         const { username, password } = values
         
         // 发送异步
         axios.post('http://localhost:3000/api/login',{username,password})
         .then(({data}) => {
           // 判断发送的请求是否成功的
           if(data.status===0){
             // 请求成功了,提示信息:登录成功
             message.success('登录成功')
             // 保存用户信息
             this.props.saveUser(data.data)
             // 跳转界面
           } else {
             // 验证失败了
             message.error(data.msg)
             // 清空密码框
             this.props.from.resetFields(['password'])
           }
         })
         .catch((error)=>{
           message.error('请求失败:'+error)
         })
         // 发送异步请求失败,获取用户信息,保存
       } else {
         message.error('表单验证失败')
       }

    })
  };
  // 做表单的验证,自定义校验器validator
  validator = (rule, value, callback) => {
    // console.log(rule)
    // 密码验证:规则和用户名验证规则是一样的(必须有内容,大于3位,小于12位,有数字/字母/下划线)
    if (!value) {
      // 用来做提示的
      callback('必须输入密码')
    } else if (value.length < 4) {
      callback('必须大于3位')
    } else if (value.length >= 12) {
      callback('必须小于12位')
    } else if (!/^[0-9a-zA-Z]+$/.test(value)) {
      callback('只能输入数字、字母、下划线')
    } else {
      callback()
    }
    //console.log(value)
    // callback()
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className="login">
        <div className="login_header">
          <img src={logo} alt={logo} />
          <h1>React项目:后台管理系统</h1>
        </div>
        <div className="login_content">
          <h2>用户登录</h2>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Item>
              {
                // 用户名,必须是大于4位,必须是小于12位,用户名只能是数字/字母/下划线
                getFieldDecorator('username', {
                  rules: [
                    { required: true, message: '请输入用户名' },
                    { min: 4, message: '必须是大于3位' },
                    { max: 12, message: '必须是小于12位' },
                    { pattern: /^[0-9a-zA-Z_]+$/, message: '只能输入数字、字母、下划线' },
                  ]
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="帐号"
                  />
                )
              }

            </Item>
            <Item>
              {
                getFieldDecorator('password', {
                  // initialValue:'admin', // 初始化密码的
                  rules: [
                    { validator: this.validator }
                  ]
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="密码"
                  />
                )
              }

            </Item>
            <Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登 录
              </Button>
            </Item>
          </Form>
        </div>
      </div>
    );
  }
}
//export default Form.create()(Login)
//export default connect(状态数据,action)(Form.create()(Login))
export default Login;