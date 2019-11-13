import React, { Component } from 'react';
import { Form, Input, Tree } from 'antd';
import PropTypes from 'prop-types'
import menus from '../../config/menus.js'
// 引入i18
import { withTranslation } from 'react-i18next'
import PubSub from 'pubsub-js'
const Item = Form.Item;
const { TreeNode } = Tree;
@withTranslation()
@Form.create()
class UpdateRoleForm extends Component {
  // 设置role的类型及是否是必须的
  static propTypes = {
    role: PropTypes.object.isRequired
  }
  // 通过一个方法,设置节点树中的显示的数据
  getTreeNodes= () => {
    const treeDate = menus.map(menu => {
      if (menu.children) {
        return {
          title: menu.title,
          key: menu.key,
          children: menu.children.map(cMenu => {
            return {
              title: cMenu.title,
              key: cMenu.key
            }
          })
        }
      } else {
        return {
          title: menu.title,
          key: menu.key
        }
      }
    })
    return [
      {
        title: '平台权限',
        key: '/power',
        children: treeDate 
      }
    ]
  }
  // 构造器------
  constructor(props) {
    super(props)
    // 把当前组件的form对象传入父级组件中
    this.props.setUpdateForm(this.props.form)
  }
  //设置父级组件传入的数据的类型及是否是必须的
  static propTypes = {
    setUpdateForm: PropTypes.func.isRequired
  }
  state = {
    checkedKeys: [] // 默认是空的---将来存储的是多个字符串类型的路径--key
  };
  onCheck = (checkedKeys) => {
    // 更新状态数据
    this.setState({ checkedKeys }, ()=>{
      // 缓存
      PubSub.publish('getCheckedKeys', checkedKeys );
      // 可以清空state中的checkedKeys的数据
      this.state.checkedKeys=[]
    })
  }


  renderTreeNodes = data => data.map((item) => {
    const { t } = this.props
    if (item.children) {
      return (
        <TreeNode title={t(item.title)} key={item.key} dataRef={item}>
          {
            this.renderTreeNodes(item.children)
          }
        </TreeNode>
      );
    }
    return <TreeNode title={t(item.title)} key={item.key} />;
  });

  render() {
    const { getFieldDecorator } = this.props.form;
    const { name,menus } = this.props.role
    
    const {checkedKeys} = this.state
    this.props.setUpdateForm(this.props.form)
    return (
      <Form>
        <Item label='角色名称'>
          {
            getFieldDecorator(
              'name',
              {
                initialValue: name || ''
              }
            )(
              <Input placeholder='请输入角色名称' disabled />
            )
          }
        </Item>
        <Item>
          <Tree
            checkable
            defaultExpandAll
            checkedKeys = {checkedKeys.length?checkedKeys:menus}
            onCheck={this.onCheck}
          >
            {this.renderTreeNodes(this.getTreeNodes())}
          </Tree>
        </Item>
      </Form>
    )
  }
}

export default UpdateRoleForm;