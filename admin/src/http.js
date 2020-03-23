import axios from 'axios'
import Vue from 'vue'
import router from './router'
const http = axios.create({
    baseURL: 'http://localhost:3000/admin/api'  //接口地址
})

// 用户信息请求头
http.interceptors.request.use(config => {
    if(localStorage.token) {
        config.headers.Authorization = 'Bearer ' + (localStorage.token || '')
    }
    return config
}, err => {
    return Promise.reject(err)
})

// 全局捕获 给http请求加拦截器
http.interceptors.response.use(res => {
    return res
    // status>=400时进入err
}, err => {
    console.log(err)
    if (err.response.data.message) {
        Vue.prototype.$message({
            type: 'error',
            message: err.response.data.message
        }) 
        if (err.response.status === 401) {
            router.push('/login')
        }
    }
    
    return Promise.reject(err)
})
export default http