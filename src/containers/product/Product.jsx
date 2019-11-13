import React, { Component } from 'react';
// 引入antd
import { Card, Select, Input, Icon, Button, Table, Divider, Modal } from 'antd'
// 引入样式
import './Product.css'
// 引入api/接口
import { reqGetProducts, reqDeleteProduct, reqSearchProduct } from '../../api/index.js'
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
      //dataIndex: 'detail',
      render: (product) => {
        return (
          <div>
            <Button type="link">详情</Button>
            <Button type="link" onClick={() => { this.showAddUpdate(product) }}>修改</Button>
            <Button type="link" onClick={() => { this.delProduct(product._id) }}>删除</Button>
          </div>
        )
      }
    }
  ]
  // 删除操作
  delProduct = (productId) => {
    Modal.confirm({
      title: '确认删除吗',
      okText: '确认',
      cancelText: '取消',
      // 箭头函数
      onOk: async () => {
        // 调用删除数据的接口
        await reqDeleteProduct(productId)
        this.setState({
          current: 1
        })
        this.getProducts(1, 3)
      }
    })
  }


  // 状态数据
  state = {
    products: [], // 用来存储所有商品的信息的(数组,里面是对象)
    total: 0, //总数据条数
    searchKey: 'productName', // 默认搜索的是 商品名字
    searchValue: '', // 默认搜索的是空的内容---文本框没有内容输入
    pageNum: 1,
    pageSize: 3,
    isSearch: false,  // 默认是正常的获取数据,如果为true则是搜索的方式来获取数据
    
    prevStateValue: '',
    current: 1
  }
  // 发送请求获取商品的信息数据
  getProducts = async (pageNum, pageSize) => {
    // 取出isSearch, 判断是搜索还是正常获取数据
    const { isSearch, prevStateValue } = this.state

    let result
    if (isSearch) {
      const { searchKey } = this.state
      result = await reqSearchProduct({ searchKey, searchValue: prevStateValue, pageNum, pageSize })
    } else {
      result = await reqGetProducts(pageNum, pageSize)
      this.setState({
        isSearch: false
      })
    }
    console.log(pageNum, pageSize)

    if (result.status === 0) {
      // 更新状态数据
      this.setState({
        products: result.data.list, // 商品数组信息
        total: result.data.total, // 总条数
        searchValue: prevStateValue,
        current: pageNum
      })
    }
  }
  // 界面渲染完毕
  componentDidMount() {
    this.getProducts(1, 3)
  }

  // 显示添加或者修改的界面
  showAddUpdate = (product) => {
    // 跳转
    this.props.history.push('/product/addupdate', product)
  }

  // 如果下拉框选中的内容发生改变,就会触发这个事件
  select = (value) => {
    // 如果选中内容改变,就更新状态数据
    this.setState({
      searchKey: value
    })
  }
   // 获取文本框中的数据,只要内容改变,该事件就触发,就可以实时的获取文本框的内容
   changeInput = (e) => {
    this.setState({
      searchValue: e.target.value
    })
  }
  // 搜索
  search = async () => {
    // 解构出状态中要使用的数据
    let { searchKey, searchValue, pageNum, pageSize } = this.state
    // 调用搜索接口,进行搜索
    const result = await reqSearchProduct({ searchKey, searchValue, pageNum, pageSize })
    //this.refs.tb.props.pagination.
    if (result.status === 0) {
      // 更新状态数据
    this.setState({
      products: result.data.list,
      total: result.data.total,
      isSearch: true, // 原来默认是false,如果是搜索了,那么此时为true
      // 是否需要更新其他数据======
      prevStateValue: searchValue,
      current: 1
    })

    }
  }
  render() {
    const { products, total, searchKey, searchValue, pageNum, current } = this.state
    return (
      <Card
        title={
          <div>
            <Select value={searchKey} onChange={this.select}>
              <Option key="1" value="productName">根据商品名称</Option>
              <Option key="2" value="productDesc">根据商品描述</Option>
            </Select>
            <Input placeholder="关键字" className="product-input" onChange={this.changeInput} value={searchValue} />
            <Button type="primary" onClick={this.search}>搜索</Button>
          </div>
        }
        extra={
          <Button type="primary" onClick={() => { this.showAddUpdate() }}><Icon type="plus" />添加商品</Button>
        }
      >
        <Table
          ref='tb'
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
            onChange: this.getProducts,
            onShowSizeChange: this.getProducts,
            current
          }}
        />
      </Card>
    );
  }
}

export default Product;
