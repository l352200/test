//登陆注册的接口
// @ts-ignore
import {reqGetCode,reqUserRegiser,reqUserLogin,reqUserInfo,reqLogOut}from'@/api'
// @ts-ignore
import{setToken}from '@/utils/token'
import { removeToken } from '../../utils/token';
const state={
    code:'',
    token:localStorage.getItem('TOKEN'),
    userInfo:{}
}
const mutations={
    GETCODE(state,code){
        state.code=code;

    },
    USERLOGIN(state,token){
        state.token=token
    },
    GETUSERINFO(state,userinfo){
        state.userInfo=userinfo
    },
    CLEAR(state){
        state.token='';
        state.userInfo={};
        removeToken();
    }
}
const actions={
    async getCode({commit},phone){
        let result=await reqGetCode(phone);
        // console.log(result);
        if(result.code==200){
            commit('GETCODE',result.data);
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    async userRegister({commit},user){
        let result=await reqUserRegiser(user);
        if(result.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'));
        }
    },
    async userLogin({commit},data){
        let result=await reqUserLogin(data);
        if(result.code==200){
            commit("USERLOGIN",result.data.token)
            setToken(result.data.token)
        }
        else{
            return Promise.reject(new Error('fail'));
        }
    },
    async getUserInfo({commit}){
        let result=await reqUserInfo();
        if(result.code==200){
            commit("GETUSERINFO",result.data);
            return 'ok'
        }
        else{
            return Promise.reject(new Error('fail'));
        }
    },
    async userLogout({commit}){
        let result=await reqLogOut();
        if(result.code==200){
            commit('CLEAR');
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    }
}
const getters={}

export default{
    state,
    mutations,
    actions,
    getters
}