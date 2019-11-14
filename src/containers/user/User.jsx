import React, { Component } from 'react';
import { Card, Button, Table, Modal } from 'antd';
import dayjs from "dayjs";

import AddUserForm from './add-user-form';
import UpdateUserForm from './update-user-form';
import { connect } from 'react-redux'
import { getUsers, getRoles, addUser, deleteUser, updateUser } from '../../redux/action-creators.js'
@connect(state => ({ users: state.users, roles: state.roles }), { getUsers, getRoles, addUser, deleteUser, updateUser })
class User extends Component {
  state = {
    isShowAddUserModal: false, //是否展示创建用户的标识
    isShowUpdateUserModal: false, //是否展示更新用户的标识
  };

  componentDidMount() {
    // 为了获取用户请求,可能需要发送请求
    if (!this.props.users.length) {
      // 获取用户信息
      this.props.getUsers()
    }
    // 为了获取权限信息,可能需要发送请求
    if (!this.props.roles.length) {
      this.props.getRoles()
    }

  }

  // addUserFormRef = React.createRef();
  // updateUserFormRef = React.createRef();
  // 第一行中的每一列要显示的数据的设置
  columns = [
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '电话',
      dataIndex: 'phone',
    },
    {
      title: '注册时间',
      dataIndex: 'createTime',
      render: time => dayjs(time).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: '所属角色',
      dataIndex: 'roleId',
      render: (roleId) => {
        if (this.props.roles.length) {
          const result = this.props.roles.find(role => role._id === roleId)
          return result.name
        }
      }
    },
    {
      title: '操作',
      render: user => {
        return <div>
          <Button type="link" onClick={() => { this.showUpdate(user.username) }}>修改</Button>
          <Button type="link" onClick={() => { this.delUser(user.username) }}>删除</Button>
        </div>
      }
    }
  ];
  // 删除用户
  delUser = (username) => {
    Modal.confirm({
      title: '确认删除吗',
      okText: '确认',
      cancelText: '取消',
      // 箭头函数
      onOk: () => {
        this.props.deleteUser(username)
      }
    })
  }

  // 创建用户的回调函数
  addUser = () => {
    // 所有的表单验证全都要通过
    const form = this.addForm
    form.validateFields((err, values) => {
      if (!err) {
        // 添加数据---redux中添加user的方法
        const { username, password, phone, email, roleId } = values
        this.props.addUser({ username, password, phone, email, roleId })
        this.addForm.resetFields()// 清空
        this.setState({
          isShowAddUserModal: false
        })
      }
    });
  };

  // 点击按钮弹出(显示)添加用户信息的窗口
  showAdd = () => {
    this.setState({
      isShowAddUserModal: true
    })
  }
  // 点击取消按钮隐藏添加用户信息的窗口
  hideAdd = () => {
    this.addForm.resetFields()
    this.setState({
      isShowAddUserModal: false
    })
  }
  // 更新用户的回调函数
  updateUser = () => {
    // 表单验证通过,判断两次密码是否一致
    // 所有的表单验证全都要通过
    const form = this.updateForm
    form.validateFields((err, values) => {
      if (!err) {
        const { password, rePassword } = values

        if (password !== rePassword)
          return console.log('密码不一致')
        
        const username = this.username
        this.props.updateUser(username, password)
        this.hideUpdate()
      }
    })
  };
  // 显示修改用户的窗口
  showUpdate = (username) => {
    // 缓存用户名
    this.username = username
    this.setState({
      isShowUpdateUserModal: true
    })
  }
  // 点击取消按钮隐藏修改用户信息的创建
  hideUpdate = () => {
    this.updateForm.resetFields()
    this.setState({
      isShowUpdateUserModal: false
    })
  }

  render() {
    const { isShowAddUserModal, isShowUpdateUserModal } = this.state;
    const { users } = this.props
    return (
      <Card
        title={
          <Button type='primary' onClick={this.showAdd}>创建用户</Button>
        }
      >
        <Table
          columns={this.columns}
          dataSource={users}
          bordered
          rowKey='_id'
          pagination={{
            defaultPageSize: 5,
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '15', '20'],
            showQuickJumper: true,
          }}
        />

        <Modal
          title="创建用户"
          visible={isShowAddUserModal}
          onOk={this.addUser}
          onCancel={this.hideAdd}
          okText='确认'
          cancelText='取消'
        >
          <AddUserForm setAdd={form => this.addForm = form} />
        </Modal>

        <Modal
          title="更新用户"
          visible={isShowUpdateUserModal}
          onOk={this.updateUser}
          onCancel={this.hideUpdate}
          okText='确认'
          cancelText='取消'
        >
          <UpdateUserForm setUpdate={form => this.updateForm = form} />
        </Modal>

      </Card>
    )
  }
}
export default User;
