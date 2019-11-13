// 是接口文件,包含了多个封装的接口
// 调用二次封装的axios
import ajax from './ajax.js'

// 封装接口了--发送请求
export const reqLogin = (username, password) => ajax({
  method: 'POST',
  url: '/login',
  data: {
    username,
    password
  }
})
// 获取分类信息数据的接口
export const reqCategories = () => ajax({
  method: 'GET',
  url: '/category/get'
})

// 添加分类信息数据接口
export const reqAddCategory = (categoryName) => ajax({
  method: 'POST',
  url: '/category/add',
  data: {
    categoryName
  }
})

// 更新分类信息的数据接口
export const reqUpdateCategory = (categoryId, categoryName) => ajax({
  method: 'POST',
  url: '/category/update',
  data: {
    categoryId,
    categoryName
  }
})

// 删除分类信息的数据接口
export const reqDeleteCategory = (categoryId) => ajax({
  method: 'POST',
  url: '/category/delete',
  data: {
    categoryId
  }
})

// 获取商品信息数据的接口
export const reqGetProducts = (pageNum, pageSize) => ajax({
  method: 'GET',
  url: '/product/list',
  params: {
    pageNum,
    pageSize
  }
})

// 添加商品信息数据的接口
export const reqAddProduct = ({
  categoryId,
  name,
  price,
  desc,
  detail
}) => ajax({
  method: 'POST',
  url: '/product/add',
  data: {
    categoryId,
    name,
    price,
    desc,
    detail
  }
})

// 修改商品信息数据的接口
export const reqUpdateProduct = ({
  productId,
  categoryId,
  name,
  price,
  desc,
  detail
}) => ajax({
  method: 'POST',
  url: '/product/update',
  data: {
    productId,
    categoryId,
    name,
    price,
    desc,
    detail
  }
})

// 删除商品信息数据的接口
export const reqDeleteProduct = (productId) => ajax({
  method: 'POST',
  url: '/product/delete',
  data: {
    productId
  }
})

// 收索商品信息的数据接口
export const reqSearchProduct = ({
  searchKey,
  searchValue,
  pageNum,
  pageSize
}) => ajax({
  method: 'GET',
  url: '/product/search',
  params: {
    [searchKey]: searchValue,
    pageNum,
    pageSize

  }

})
// 获取角色信息的数据接口
export const reqGetRoles = () => ajax('/role/get')
// 添加角色信息的数据接口
export const reqAddRole = (name) => ajax({
  method: 'POST',
  url: '/role/add',
  data: {
    name
  }
})
// 更新角色信息的数据接口
export const reqUpdateRole = (roleId, authName, menus) => ajax({
  method: 'POST',
  url: '/role/update',
  data: {
    roleId,
    authName,
    menus
  }
})
// 删除角色信息的数据接口
export const reqDeleteRole = (roleld) => ajax({
  method: 'POST',
  url: '/role/delete',
  data: {
    roleld
  }
})

// 获取用户的信息数据的接口
export const reqGetUsers = () => ajax('/user/get')
// 添加用户的信息数据的接口
export const reqAddUser = ({ username, password, phone, email, roleId }) => ajax({
  method: 'POST',
  url: '/user/add',
  data: {
    username,
    password,
    phone,
    email,
    roleId

  }
})
// 修改用户的信息数据的接口
export const reqUpdateUser = (username, password) => ajax({
  method: 'POST',
  url: '/user/update',
  data: {
    username,
    password
  }
})
// 删除用户的信息数据的接口
export const reqDeleteUser = (username) => ajax({
  method: 'POST',
  url: '/user/delete',
  data: {
    username
  }
})
