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
  url:'/category/get'
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
export const reqUpdateCategory = (categoryId,categoryName) => ajax({
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