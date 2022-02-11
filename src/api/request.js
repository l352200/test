// 对axios二次封装
import axios from "axios";
//引入进度条
import nprogress from "nprogress";
//
// @ts-ignore
import store from '@/store'
//引入进度条样式
//
import "nprogress/nprogress.css"

// 利用axios对象方法create 创建一个axios实例

const requests = axios.create({
    baseURL: 'http://39.98.123.211/api',
    timeout: 5000,

});
// 请求拦截器
requests.interceptors.request.use((config) => {
    if(store.state.detail.uuid_token){
        config.headers.userTempId=store.state.detail.uuid_token
    }
    if(store.state.user.token){
        config.headers.token=store.state.user.token
    }
    //config 是一个配置对象 对象里header请求头很最重要

    nprogress.start();
    return config;
});
// 响应拦截器
requests.interceptors.response.use((res) => {
    //服务器响应成功的回调
    nprogress.done();
    return res.data;
}, (error) => {
    // 服务器响应失败的回调
    console.log("响应失败:" + error);
    return Promise.reject(new Error('fail'));
});



// 对外暴露
export default requests;