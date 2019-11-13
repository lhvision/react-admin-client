// 包含了多个同步及异步的action的creator---包含了多个生产action对象的工厂函数
// 引入action的type
import { SAVE_USER, REMOVE_USER, UPDATE_TITLE,GET_CATEGORIES,ADD_CATEGORY,UPDATE_CATEGORY, DELETE_CATEGORY,GET_ROLES,ADD_ROLE,UPDATE_ROLE,DELETE_ROLE,GET_USERS,ADD_USER,UPDATE_USER,DELETE_USER} from './action-types.js'
// 引入接口文件
import {reqCategories,reqAddCategory,reqUpdateCategory,reqDeleteCategory, reqGetRoles, reqAddRole, reqUpdateRole, reqDeleteRole,reqGetUsers } from '../api/index'
// 保存用户信息(的同时也要保存token)
export const saveUser = (value) => ({ type: SAVE_USER, data: value })
// 删除用户信息(的同时也要删除token)
export const removeUser=()=>({type:REMOVE_USER})
// 更新title的信息
export const updateTitle=(value)=>({type:UPDATE_TITLE,data:value})

// 获取分类信息数据的同步action对象
const getCategoriesSuccess = (categories) => ({type:GET_CATEGORIES,data:categories})
// 获取分布信息数据的异步action函数
export const getCategories = () => {
  return async (dispatch) => {
    const result = await reqCategories()
    if (result.status === 0) {
        // 请求接口成功后,有了结果之后,再分发同步的action
        dispatch(getCategoriesSuccess(result.data))
    }
  }
}

// 添加分类信息的数据的同步action对象
const addCategorySuccess = (category) => ({ type: ADD_CATEGORY, data: category })
// 更新分类信息的数据的异步action函数
export const addCategory = (categoryName) => {
  return async (dispatch) => {
    const result = await reqAddCategory(categoryName)
    if(result.status === 0){
      // 成功了,就是有结果了
      dispatch(addCategorySuccess(result.data))
    }
  }
}

// 更新分类信息的数据的同步action对象
const updateCategorySuccess = (category) => ({ type: UPDATE_CATEGORY, data: category})
// 更新分类信息的数据的异步action函数
export const updateCategory = (categoryId,categoryName) => {
  return async (dispatch) => {
    const result = await reqUpdateCategory(categoryId,categoryName)
    if(result.status === 0){
      // 成功了,就是有结果了
      dispatch(updateCategorySuccess(result.data))
    }
  }
}

// 删除分类信息的数据的同步action对象
const daleteCategorySuccess = (category) => ({ type:DELETE_CATEGORY, data: category })
// 删除分类信息的数据的异步action函数
export const daleteCategory = (categoryId) => {
  return async (dispatch) => {
    const result = await reqDeleteCategory(categoryId)
    if(result.status === 0){
      // 成功了,就是有结果了
      dispatch(daleteCategorySuccess(result.data))
    }
  }
}

// 获取角色信息的数据同步action对象
const getRolesSuccess = (roles) => ({ type: GET_ROLES, data: roles })
// 获取角色信息的数据异步action函数
export const getRoles = () => {
  return async (dispatch) => {
    const result = await reqGetRoles()
    if(result.status === 0 ){
      // 成功了,就是有结果了
      dispatch(getRolesSuccess(result.data))
    }
  }
} 
// 添加角色信息的数据同步action对象
const addRoleSuccess = (role) => ({ type: ADD_ROLE, data: role })
// 添加角色信息的数据异步action函数
export const addRole = (name) => {
  return async (dispatch) => {
    const result = await reqAddRole(name)
    if(result.status === 0){
      dispatch(addRoleSuccess(result.data))
    }
  }
}
// 修改角色信息的数据同步action对象
const updateRoleSuccess = (role) => ({ type: UPDATE_ROLE, data: role })
// 修改角色信息的数据异步action函数
export const updateRole = (roleId, authName, menus) => {
  return async (dispatch) => {
    const result = await reqUpdateRole(roleId, authName, menus)
    if(result.status === 0){
      dispatch(updateRoleSuccess(result.data))
    }
  }
}
// 删除角色信息数据的同步action对象
const deleteRoleSuccess = (roleId) => ({ type: DELETE_ROLE, data: roleId })
// 删除角色信息数据的异步action函数
export const deleteRole = (roleId) => {
  return async (dispatch) => {
    const result = await reqDeleteRole(roleId)
    if (result.status === 0) {
      dispatch(deleteRoleSuccess(roleId))
    }
  }
}
// 获取角色信息的数据同步action对象
// 获取角色信息的数据异步action函数
// 获取角色信息的数据同步action对象
// 获取角色信息的数据异步action函数
// 获取角色信息的数据同步action对象
// 获取角色信息的数据异步action函数
// 获取角色信息的数据同步action对象
// 获取角色信息的数据异步action函数
// 获取角色信息的数据同步action对象
// 获取角色信息的数据异步action函数