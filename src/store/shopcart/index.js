// @ts-ignore
import{reqCartList,reqDeleteCartById,reqUpdateCheckedByid} from '@/api'

const state={
    cartList:[]
};
const mutations={
    GETCARTLIST(state,CartList){
        state.cartList=CartList
    }
};
const actions={
    async getCartList({commit}){
        let result=await reqCartList();
        if(result.code==200){
            // console.log(result);
            commit('GETCARTLIST',result.data)
        }
    },
    async deleteCartListBySkuId({commit},skuId){
        let result=await reqDeleteCartById(skuId);
        if(result.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'));
        }
    },
    async updateCheckedById({commit},{skuId,isChecked}){
        let result=await reqUpdateCheckedByid(skuId,isChecked);
        if(result.code==200){
            return 'ok'
        }else{
              console.log(result);
            return Promise.reject(new Error('fail'));
          
        }
    },
    deleteAllCheckedCart({dispatch,getters}){
        let PromiseAll=[];
        getters.cartList.cartInfoList.forEach(item => {
            let promise=item.isChecked==1?dispatch('deleteCartListBySkuId',item.skuId):'';
            PromiseAll.push(promise);
        });
        return Promise.all(PromiseAll)
    },
    updateAllCartIschecked({dispatch,state},isChecked){
        let PromiseAll=[];
        state.cartList[0].cartInfoList.forEach(item => {
            let promise=dispatch('updateCheckedById',{skuId:item.skuId,isChecked});
            PromiseAll.push(promise);
        });
        return Promise.all(PromiseAll);
    }
};
const getters={
    cartList(state){
        return state.cartList[0]||{}
    },

};
export default{
    state,
    mutations,
    actions,
    getters
}