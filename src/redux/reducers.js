// 包含了多个的reducer, 更新/修改状态数据的函数

// 引入action的type
import {SAVE_USER} from './action-types.js'
// 引入redux
import {combineReducers} from 'redux'
// 引入storage.js
import {setItem,getItem,removeItem} from '../utils/storage.js'
const initUser = {
  user:getItem('user')||{},
  token:getItem('token')||''
}