// 引入React
import React from 'react'
// 引入ReactDOM
import ReactDOM from 'react-dom'
// 引入重置的样式文件
import './assets/css/reset.css'
// 引入App.jsx
import App from './App.jsx'
// 引入store
import store from './redux/store.js'
// 引入redux
import {Provider} from 'react-redux'
// 渲染组件
ReactDOM.render((
    <Provider store={store}>
        <App/>
    </Provider>
) ,document.getElementById('root'))