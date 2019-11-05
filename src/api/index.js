// 是接口文件,包含了多个封装的接口
// 调用二次封装的axios
import ajax from './ajax.js'
import axios from './ajax.js'
import Password from 'antd/lib/input/Password'
// 封装接口了--发送请求
export const reqLogin = (username, password) => ajax({
    method: 'POST',
    url: '/login',
    data: {
        username,
        password
    }
})