// 引入路由组件
import Login from "../pages/Login/Login";
import Admin from "../pages/Admin/Admin";
export default[
  {
    exact: true,
    path: '/login',
    component: Login
  },
  {
    exact: true,
    path: '/',
    component: Admin
  }
]