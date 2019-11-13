import React, { Component } from 'react';
import { Card, Input, Button, Icon, Select, InputNumber, Form } from 'antd'
// 引入connect
import { connect } from 'react-redux'
import { getCategories } from '../../../redux/action-creators.js'
// https://jpuri.github.io/react-draft-wysiwyg/#/
// 引入高大上的富文本编辑器
import TextEditor from './text-editor/TextEditor.jsx'
// 负责转换数据效果的
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
// 引入api接口
import { reqAddProduct, reqUpdateProduct } from '../../../api/index.js'
// 解构出Option Item
const { Option } = Select
const { Item } = Form
@connect((state) => ({ categories: state.categories }), { getCategories })
@Form.create()
class AddUpdate extends Component {
  // 表单提交的事件
  submit = (e) => {
    // 阻止事件的默认行为
    e.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log(values)
        const editorState = this.editor.state.editorState
        const detail = draftToHtml(convertToRaw(editorState.getCurrentContent()))
        const { categoryId, name, price, desc } = values
         
        // 商品的id信息
        const product = this.props.location.state
        if (product) {
          // 发送请求,真正的添加数据
          
          const productId = product._id
          await reqUpdateProduct({productId,categoryId,name,price,desc,detail})
        } else {
          // const result = await reqAddProduct({ categoryId, name, price, desc, detail })
         
          await reqAddProduct({ categoryId, name, price, desc, detail })
          //if(result.status === 0){     
        }
        this.props.history.push('/product')
        //}
      }
    })
  }
  // 界面渲染完毕
  componentDidMount() {
    // 发送请求,获取分类信息
    // 判断,如果有数据,就不发送请求

    if (this.props.categories.length === 0) {
      this.props.getCategories()
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    // 解构出categories数据
    const { categories } = this.props
    // 获取路由跳转后,传入进来的参数数据
    const product = this.props.location.state || {}
    console.log(this.props)
    return (
      <Card
        title={
          <div>
            <Icon onClick={() => { this.props.history.goBack() }} type="arrow-left" />
            <span>{product._id?'修改':'添加'}商品</span>
          </div>
        }
      >
        <Form labelCol={{ span: 2 }} wrapperCol={{ span: 8 }} onSubmit={this.submit}>
          <Item label="商品名称">
            {
              getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入商品名称' }],
                initialValue: product.name || ''
              })(
                <Input placeholder="请输入商品名称" />
              )
            }

          </Item>
          <Item label="商品描述">
            {
              getFieldDecorator('desc', {
                rules: [{ required: true, message: '请输入商品描述' }],
                initialValue: product.desc || ''
              })(
                <Input placeholder="请输入商品描述" />
              )
            }

          </Item>
          <Item label="商品分类">
            {
              getFieldDecorator('categoryId', {
                rules: [{ required: true, message: '请选择商品分类' }],
                initialValue: product.categoryId || '请选择商品分类'
              })(
                <Select placeholder="请选择商品分类">
                  {
                    categories.map(category => {
                      return <Option key={category._id} value={category._id}>{category.name}</Option>
                    })
                  }

                </Select>
              )
            }

          </Item>
          <Item label="商品价格">
            {
              getFieldDecorator('price', {
                rules: [{ required: true, message: '请输入商品价格' }],
                initialValue: product.price || ''
              })(
                <InputNumber
                  formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/￥\s?|(,*)/g, '')}
                />
              )
            }

          </Item>
          <Item wrapperCol={{ span: 20 }} >
            <TextEditor setEditor={(editor) => { this.editor = editor } } detail={product.detail || ''}/>
          </Item>
          <Item >
            <Button type="primary" htmlType="submit">提交</Button>
          </Item>

        </Form>
      </Card>
    );
  }
}

export default AddUpdate;
