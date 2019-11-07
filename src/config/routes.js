// 引入路由组件
import Admin from "../components/Admin/Admin.jsx";
import Login from "../containers/Login/Login.jsx";
import Category from "../components/category/Category.jsx";
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
  }
]