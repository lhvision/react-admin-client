import React, { Component } from 'react';
// 引入antd
import { Card, Select, Input, Icon, Button, Table, Divider } from 'antd'
// 引入样式
import './Product.css'
// 引入api/接口
import { reqGetProducts } from '../../api/index.js'
// 解构出Option
const { Option } = Select

class Product extends Component {
  columns = [
    {
      title: '商品名称',
      dataIndex: 'name'
    },
    {
      title: '商品描述',
      dataIndex: 'desc'
    },
    {
      title: '价格',
      dataIndex: 'price',
      render: (text) => {
        return `￥ ${text} 元`
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: () => {
        return (
          <div>
            <Button type="primary">上架</Button>
            <span>已下架</span>
          </div>
        )
      }
    },
    {
      title: '操作',
      dataIndex: 'detail',
      render: () => {
        return (
          <div>
            <Button type="link">详情</Button>
            <Button type="link">修改</Button>
            <Button type="link">删除</Button>
          </div>
        )
      }
    }
  ]
  // 状态数据
  state = {
    products: [], // 用来存储所有商品的信息的(数组,里面是对象)
    total: 0 //总数据条数
  }
  // 发送请求获取商品的信息数据
  getProducts = async (pageNum, pageSize) => {
    const result = await reqGetProducts(pageNum, pageSize)
    if (result.status === 0){
      // 更新状态数据
      this.setState({
        products: result.data.list, // 商品数组信息
        total: result.data.total // 总条数
      })
    }
  }
  // 界面渲染完毕
  componentDidMount() {
    this.getProducts(1,3) 
  }

  // 显示添加或者修改的界面
  showAddUpdate = () => {
    // 跳转
    this.props.history.push('/product/addupdate')
  }
  render() {
    const { products, total } = this.state
    return (
      <Card
        title={
          <div>
            <Select defaultValue="1">
              <Option key="1" value="1">根据商品名称</Option>
              <Option key="2" value="2">根据商品描述</Option>
            </Select>
            <Input placeholder="关键字" className="product-input" />
            <Button type="primary">搜索</Button>
          </div>
        }
        extra={
          <Button type="primary" onClick={()=>{this.showAddUpdate()}}><Icon type="plus"/>添加商品</Button>
        }
      >
        <Table
          columns={this.columns}
          dataSource={products}
          bordered
          rowKey="_id"
          pagination={{
            showSizeChanger: true,
            showQuickJumper: true,
            defaultPageSize: 3,
            pageSizeOptions: ['3', '6', '9', '12'],
            total,
            onChange:this.getProducts,
            onShowSizeChange:this.getProducts
          }}
        />
      </Card>
    );
  }
}

export default Product;
