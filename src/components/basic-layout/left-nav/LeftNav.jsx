import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
// 引入菜单数据
import menus from '../../../config/menus.js'
import { withRouter, Link } from 'react-router-dom'
// 引入connect
import {connect} from 'react-redux'
// 引入action
import {updateTitle} from '../../../redux/action-creators.js'
// 引入实现国际化的翻译的相关的包,高阶组件
import { withTranslation } from 'react-i18next';
const { SubMenu } = Menu;
@connect(state=>({ menus: state.user.user.menus }),{updateTitle})
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
  createMenus = (menus) => {
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
          if(pathname.startsWith(cMenu.key)){
              // 获取该二级菜单的一级菜单的key
              return menu.key
          }
        }
      }
    }
  }
  // 方法--根据路径找先对应title
  findTitleByKey = (pathname) => {
    // menus中找
    for (let i =0; i < menus.length; i++){
      const menu = menus[i]
      // 判断当前的对象中是否有子对象
      if (menu.children){
        // 继续遍历子级的菜单
        for (let j = 0; j < menu.children.length; j++){
          // 当前数组中每个对象(子的菜单)
          const cMenu = menu.children[j]
          if (pathname.startsWith(cMenu.key)) {
            return cMenu.title
          }
        }
      } else {
        if (menu.key === pathname) {
          return menu.title
        }
      }
    }
  }
  componentDidMount(){
    // 获取路径
    const {pathname} = this.props.location
    // 根据路径找对应的title
    const title = this.findTitleByKey(pathname)
    // 跟新redux中的title数据
    this.props.updateTitle(title)
  }
  // 选中额时候更新对应的title
  selectItem = ({key}) => {
    //key: "/user" 是一个路径 ----xxx是一个对象----item----node----innerText---获取到标题信息
    // 获取到当前选中的标题信息(中文内容)----而是整个选项的menus.title---'键'
    // t(menus.product)----进行翻译了
    //const title=item.node.innerText
    const title = this.findTitleByKey(key)
    //const title='menus.home----键的方式'
    // 更新操作---redux---action-creators中的updateTitle---action对象---->reducers---store
    this.props.updateTitle(title)
  }
  // 校验menus
  checkMenus = () => {
    return menus.reduce((prev, current) => {
      // config目录中的menus.js --- 文件中暴露出来的是menus数组 --- 每个元素都是对象
      // 当前登陆的用户对象也有一个menus---数组---中每一个元素都是字符串
      // current ---- 对象---每个menu对象
      // current.key ---- 每个字符串的路径
      // 此时登陆用户的menus数组中当前的路径
      const result = this.props.menus.includes(current.key)
      if (result) {
        prev.push(current)
      } else if (current.children) {
        const cMenus = current.children.filter(menu => this.props.menus.includes(menu.key))
        if(cMenus.length){
          prev.push({...current,children:cMenus})
        }
      }
      return prev
    }, [])
  }
  render() {
    // 调用方法显示菜单
    const newMenus = this.checkMenus()
    const menus = this.createMenus(newMenus)
    // 获取当前组件的相对应的路径,如果要使用location对象,当前的组件要么有location属性,要么当前的组件应该是一个路由组件
    let { pathname } = this.props.location
    // 添加商品时默认选择,根据pathname找到对应的key
    pathname = pathname.startsWith('/product') ? '/product' : pathname
    // defaultSelectedKeys 设置默认的菜单被选中(key的属性值,遍历生成菜单的时候,key属性值都是读取出来,路径)


    // 如果一个二级菜单被选中了,那么此时这个二级菜单对应的这个一级菜单就要被展开,defaultOpenKeys=一级菜单的路径
    // 每个标签中的key中存储的都是路径
    // 选中的是二级菜单,地址栏中的路径应该和当前你选中的这个二级菜单的路径如果一致,得到的是这个二级带单对应的一级菜单的key
    //defaultOpenKeys=一级菜单的key---一级菜单就会被展开
    const openKey = this.getOpenKey(pathname)

    return (
      <Menu theme="dark" defaultSelectedKeys={[pathname]} defaultOpenKeys={[openKey]} mode="inline" onSelect={this.selectItem}>
        {
          menus
        }

      </Menu>
    );
  }
}

export default LeftNav;