// 引入路由组件
import Admin from "../components/Admin/Admin.jsx";
import Category from "../containers/category/Category.jsx";
import Product from "../containers/product/Product.jsx";
import AddUpdate from "../containers/product/add-update/AddUpdate.jsx";
import Role from "../containers/role/Role.jsx";
import User from "../containers/user/User.jsx";

export default[
  {
    exact: true,
    path: '/',
    component: Admin
  },
  {
    exact: true,
    path: '/category',
    component: Category
  },
  {
    exact: true,
    path: '/product',
    component: Product
  },
  {
    exact: true,
    path: '/product/addupdate',
    component: AddUpdate
  },
  {
    exact: true,
    path: '/role',
    component: Role
  },
  {
    exact: true,
    path: '/user',
    component: User
  }

]