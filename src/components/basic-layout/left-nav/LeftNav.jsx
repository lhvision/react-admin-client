import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
// 引入菜单数据
import menus from '../../../config/menus.js'
import { withRouter, Link } from 'react-router-dom'

// 引入实现国际化的翻译的相关的包,高阶组件
import { withTranslation } from 'react-i18next';
const { SubMenu } = Menu;
@withTranslation()
@withRouter
class LeftNav extends Component {
  // 创建一级菜单的
  createCmenus = (menu) => {
    return (
      <Menu.Item key={menu.key}>
        <Link to={menu.key}>
          <Icon type={menu.icon} />
          <span>{this.props.t(menu.title)}</span>
        </Link>
      </Menu.Item>
    )
  }
  // 创建菜单的
  createMenus = () => {
    return menus.map(menu => {
      // 有没有二级的菜单
      if (menu.children) {

        return (
          <SubMenu
            key={menu.key}
            title={
              <span>
                <Icon type={menu.icon} />
                <span>{this.props.t(menu.title)}</span>
              </span>
            }
          >
            {
              menu.children.map(cMenu => {
                // 二级的菜单 cMenu
                return this.createCmenus(cMenu)
              })
            }

          </SubMenu>
        )
      } else {
        // 一级菜单
        return this.createCmenus(menu)
      }
    }
    )
  }

  // 根据当前路径,获取这个二级菜单所在的一级菜单的key 
  getOpenKey = (pathname) => {
    for (let i = 0; i < menus.length; i++) {
      const menu = menus[i]
      // 判断当前的这个菜单有没有children
      if (menu.children) {
        // 此时说明这个menu就是一个一级菜单,但是这个一级菜单有二级的菜单
        for (let j = 0; j < menu.children.length; j++) {
          // cMenu是当前这个一级菜单中所有的二级菜单对象{key:'路径',icon,title}
          const cMenu = menu.children[j]
          if(cMenu.key===pathname){
              // 获取该二级菜单的一级菜单的key
              return menu.key
          }
        }
      }
    }
  }

  render() {
    // 调用方法显示菜单
    const menus = this.createMenus()
    // 获取当前组件的相对应的路径,如果要使用location对象,当前的组件要么有location属性,要么当前的组件应该是一个路由组件
    const { pathname } = this.props.location
    // defaultSelectedKeys 设置默认的菜单被选中(key的属性值,遍历生成菜单的时候,key属性值都是读取出来,路径)


    // 如果一个二级菜单被选中了,那么此时这个二级菜单对应的这个一级菜单就要被展开,defaultOpenKeys=一级菜单的路径
    // 每个标签中的key中存储的都是路径
    // 选中的是二级菜单,地址栏中的路径应该和当前你选中的这个二级菜单的路径如果一致,得到的是这个二级带单对应的一级菜单的key
    //defaultOpenKeys=一级菜单的key---一级菜单就会被展开
    const openKey = this.getOpenKey(pathname)

    return (
      <Menu theme="dark" defaultSelectedKeys={[pathname]} defaultOpenKeys={[openKey]} mode="inline">
        {
          menus
        }

      </Menu>
    );
  }
}

export default LeftNav;