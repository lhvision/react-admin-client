import React, { Component } from 'react';
import { Card, Table, Button, Icon, Modal } from 'antd';
import './Category.css'
// 引入connect
import { connect } from 'react-redux'
// 引入action-creators.jsx
import { getCategories, addCategory, updateCategory, daleteCategory } from '../../redux/action-creators.js';
// 引入增加或者修改的组件
import AddUpdateCategory from './add-update-category/AddUpdateCategory.jsx'
@connect((state) => ({ categories: state.categories }), { getCategories, addCategory, updateCategory, daleteCategory })
class Category extends Component {
  // 状态数据
  state = {
    isShowAdd: false, // 切换显示或者隐藏添加分类的对话框
    isShowUpdate: false // 切换显示或者隐藏更新分类的对话框
  }
  // 生命周期函数
  componentDidMount() {
    this.props.getCategories()
    // 发送的是一个异步请求
  }
  columns = [
    {
      title: '品类名称',
      dataIndex: 'name',
    },
    {
      title: '操作',
      // dataIndex: 'operation',
      render: (category) => {
        return (
          <div>
            <Button type="link" onClick={() => { this.showUpdate(category) }}>修改分类</Button>
            <Button type="link" onClick={() => { this.showDel(category._id) }}>删除分类</Button>
          </div>
        )
      }
    },
  ];
  // 确认添加数据分类数据的操作
  addCategory = () => {
    // 添加数据
    this.form.validateFields((err, values) => {
      if (!err) {
        // 获取文本框输入的数据
        const categoryName = values.categoryName
        // 添加数据
        this.props.addCategory(categoryName)
        // 隐藏的同时直接也清空的文本框
        this.hideAdd()
      }
    })
  }
  // 隐藏添加分类的对话框
  hideAdd = () => {
    // 重置AddUpdateCategory组件中的文本框的数据
    this.form.resetFields()// 清空所有文本框的数据
    this.setState({
      isShowAdd: false
    })
  }

  // 显示更新分类的对话框
  showUpdate = (category) => {
    // 永久保存当前点击这一行的category对象
    this.category = category
    this.setState({
      isShowUpdate: true
    })
  }
  // 确定更新分类数据的操作
  updateCategory = () => {
    // 更新数据
    this.form.validateFields((err, values) => {
      if (!err) {
        // 验证已经通过了
        // 分类信息的名字
        const categoryName = values.categoryName
        // 分类信息的id
        const categoryId = this.category._id
        this.props.updateCategory(categoryId, categoryName)
        // 关闭窗口,干掉文本框
        this.form.resetFields() // 清空所有文本框的数据
        this.setState({
          isShowUpdate: false
        })

      }
    })
  }
  // 隐藏更新分类对话框
  hideUpdate = () => {
    // 重置AddUpdateCategory组件中的文本框的数据
    // 如果取消了, 那么就没必要存储这个category对象
    delete this.category
    this.form.resetFields() // 清空所有文本框的数据u
    this.setState({
      isShowUpdate: false
    })
  }

  // 删除
  showDel = (categoryId) => {
    Modal.confirm({
      title: '确认删除吗',
      okText:'确认',
      cancelText:'取消',
      // 箭头函数
      onOk:()=> {
        this.props.daleteCategory(categoryId)
      }
    })
  }
  render() {
    const { categories } = this.props
    const { isShowAdd, isShowUpdate } = this.state
    const category = this.category || {}
    return (
      <Card title="分类列表" extra={<Button type="primary" onClick={() => this.setState({ isShowAdd: true })}><Icon type="plus" />分类列表</Button>}>
        <Table
          columns={this.columns}
          dataSource={categories}
          rowKey="_id"
          bordered
          pagination={{
            showSizeChanger: true,
            showQuickJumper: true,
            pageSizeOptions: ['3', '6', '9', '12'],
            defaultPageSize: 3
          }}
        />
        <Modal
          visible={isShowAdd}
          title="添加分类"
          onOk={this.addCategory}
          onCancel={this.hideAdd}
          okText='确定'
          cancelText='取消'
          width={300}
        >

          <AddUpdateCategory setForm={form => this.form = form} />
        </Modal>
        <Modal
          visible={isShowUpdate}
          title="更新分类"
          onOk={this.updateCategory}
          onCancel={this.hideUpdate}
          okText='确定'
          cancelText='取消'
          width={300}
        >

          <AddUpdateCategory setForm={form => this.form = form} categoryName={category.name} />
        </Modal>
      </Card>
    );
  }
}

export default Category;