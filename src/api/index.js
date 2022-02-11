// 所有的api接口进行统一的管理
import requests from "./request";
//
import mockRequests from './mockAjax'
export const reqCategoryList = () => {
    return  requests({
        url: '/product/getBaseCategoryList',
        method: 'GET'
    })
}
export const reqGetBannerList=()=>mockRequests.get('/banner');
export const reqFloorList=()=>mockRequests.get('/floor');
export const reqGetSearchInfo =(params)=>requests({url:'/list',method:'post',data:params})
export const reqGoodsInfo =(skuId)=>requests({url:`/item/${skuId}`,method:'get'})
export const reqAddOrUpdateShopCart =(skuId,skuNum)=>requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'})
export const reqCartList=()=>requests({url:'/cart/cartList',method:'get'})
export const reqDeleteCartById=(skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:'delete'})
export const reqUpdateCheckedByid=(skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})

export const reqGetCode =(phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:'get'})
export const reqUserRegiser =(data)=>requests({url:'/user/passport/register',method:'post',data})
export const reqUserLogin =(data)=>requests({url:'/user/passport/login',method:'post',data})
export const reqUserInfo =()=>requests({url:'/user/passport/auth/getUserInfo',method:'get'})
export const reqLogOut =()=>requests({url:'/user/passport/logout',method:'get'})
export const reqAddressInfo =()=>requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'})
export const reqOrderInfo =()=>requests({url:'/order/auth/trade',method:'get'})
export const reqSubmitOrder =(tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,method:'post',data})
export const reqPayInfo =(orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})
export const reqPayStatus =(orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})
export const reqMyOrderList = (page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:'GET'})