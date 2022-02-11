import Vue from 'vue'
import App from './App.vue'
// 三级联动组件--全局组件
import TypeNav from '@/components/TypeNav'
Vue.component(TypeNav.name,TypeNav);
// 引入路由
import router from "@/router";
//引入仓库
import store from '@/store';
//引入mock
import '@/mock/mockServer';
//引入swiper
import "swiper/css/swiper.css";
import atm from '@/assets/1.gif';
import Pagination from '@/components/Pagination'
import {Button,MessageBox}from 'element-ui'
import * as API from '@/api'
import VueLazyload from 'vue-lazyload'
import "@/plugins/validate"
// import {reqGetSearchInfo} from '@/api';
// console.log(reqGetSearchInfo());
Vue.component(Pagination.name,Pagination);
Vue.component(Button.name,Button);
Vue.prototype.$msgbox=MessageBox;
Vue.prototype.$alert=MessageBox.alert;
Vue.config.productionTip = false
Vue.use(VueLazyload,{
  loading:atm
})
new Vue({
  render: h => h(App),
  //配置全局总线
  beforeCreate(){
    Vue.prototype.$bus=this;
    Vue.prototype.$API=API;
  },
  router,
  store
}).$mount('#app')
