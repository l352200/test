//配置路由的地方
import Vue from 'vue';
import VueRouter from 'vue-router'
// 使用插件
Vue.use(VueRouter);
//引入store
// @ts-ignore
import store from '@/store'
// 引入路由组件
// @ts-ignore
// import Home from '@/pages/Home'
// @ts-ignore
import Search from '@/pages/Search'
// @ts-ignore
import Login from '@/pages/Login'
// @ts-ignore
import Register from '@/pages/Register'
// @ts-ignore
import Detail from '@/pages/Detail'
// @ts-ignore
import AddCartSuccess from'@/pages/AddCartSuccess'
// @ts-ignore
import ShopCart from '@/pages/ShopCart'
// @ts-ignore
import Trade from '@/pages/Trade'
// @ts-ignore
import Pay from '@/pages/Pay'
// @ts-ignore
import Paysuccess from '@/pages/PaySuccess'
// @ts-ignore
import Center from '@/pages/Center'
// @ts-ignore
import MyOrder from '@/pages/Center/myOrder'
// @ts-ignore
import GroupOrder from '@/pages/Center/groupOrder'
// @ts-ignore

// 存原来VueRouter的push
let originPush=VueRouter.prototype.push;
let originReplace=VueRouter.prototype.replace;
// 重写push
// @ts-ignore
VueRouter.prototype.push=function(location,resolve,reject){
    if(resolve&&reject){
        originPush.call(this,location,resolve,reject);
    }else{
        originPush.call(this,location,()=>{},()=>{});
    }
}
// 重写replace
// @ts-ignore
VueRouter.prototype.replace=function(location,resolve,reject){
    if(resolve&&reject){
        originReplace.call(this,location,resolve,reject);
    }else{
        originReplace.call(this,location,()=>{},()=>{});
    }
}
//配置路由
let router= new VueRouter({
    routes:[
        {
            path:"/home",
            component:()=>import('@/pages/Home'),
            meta:{show:true}
        },
        {
            path:"/search/:keyword?",
            component:Search,
            meta:{show:true},
            name:'search'
        },
        {
            path:"/register",
            component:Register,
            meta:{show:false}
        },
        {
            path:"/login",
            component:Login,
            meta:{show:false}
        },
        {
            path:"/detail/:skuid",
            component:Detail,
            meta:{show:true}
        },
        {
            path:"/addcartsuccess",
            name:'addcartsuccess',
            component:AddCartSuccess,
            meta:{show:true}
        },
        {
            path:"/shopcart",
            name:'shopcart',
            component:ShopCart,
            meta:{show:true}
        },
        {
            path:"/trade",
            component:Trade,
            meta:{show:true},
            // 路由独享守卫
            // @ts-ignore
            beforeEnter:(to,from,next)=>{
                if(from.path=="/shopcart"){
                  next();    
                }else{
                    //中断
                    next(false);
                }
              
            }
        },
        {
            path:"/pay",
            component:Pay,
            meta:{show:true},
            // @ts-ignore
            beforeEnter:(to,from,next)=>{
                if(from.path=="/trade"){
                    next();    
                }else{
                    next(false);
                }
            }
        },
        {
            path:"/paysuccess",
            component:Paysuccess,
            meta:{show:true}
        },
        {
            path:"/center",
            component:Center,
            meta:{show:true},
            children:[
                {
                    path:"myorder",
                    component:MyOrder
                },
                {
                    path:"grouporder",
                    component:GroupOrder 
                },
                {
                    path:"/center",
                    redirect:"/center/myorder"
                }
            ]
        },
        // 重定向 项目跑起来是立马进入首页
        {
            path:'*',
            redirect:"/home"
        }
    ],
    //路由跳转时滚动行为
    // @ts-ignore
    // @ts-ignore
    scrollBehavior (to, from, savedPosition) {
        return { y: 0 }
    }




})
// @ts-ignore
router.beforeEach(async(to,from,next)=>{
    // next();
    let token=store.state.user.token;
    let name=store.state.user.userInfo.name
    if(token){
        if(to.path=='/login'){
            next('/home')
        }else{
            if(name){
                next();
            }else{
              try {
                await store.dispatch('getUserInfo')
                next()
              } catch (error) {
                 await store.dispatch('userLogout')
                 next('/login')
              }
            }
        }
    }else{
        let toPath = to.path;
        if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1||toPath.indexOf('/center')!=-1){
          //把未登录的时候向去而没有去成的信息，存储于地址栏中【路由】
          next('/login?redirect='+toPath);
        }else{
           //去的不是上面这些路由（home|search|shopCart）---放行
           next();
        }
    }
})
export default router;