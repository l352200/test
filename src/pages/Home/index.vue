<template>
  <div>
      
      <!-- 三级联动全局组件  已经成为 全局组件不需要再引用-->
      <TypeNav/>
      <ListContainer/>
      <Recommend/>
      <Rank/>
      <Like/>
      <Floor v-for="floor in floorList" :key="floor.id" :list="floor" />

      <Brand/>
  </div>
</template>

<script>
import ListContainer from '@//pages/Home/ListContainer'
import Recommend from '@//pages/Home/Recommend'
import Rank from '@//pages/Home/Rank'
import Like from '@//pages/Home/Like'
import Floor from '@//pages/Home/Floor'
import Brand from '@//pages/Home/Brand'
import {mapState} from 'vuex'
export default {
    name:'',
    components:{
      ListContainer,
      Recommend,
      Rank,
      Like,
      Floor,
      Brand
    },
    mounted() {
      this.$store.dispatch("getFloorList");
      // this.$store.dispatch('getUserInfo');
    },
    computed:{
      ...mapState({
        floorList:state=>state.home.floorList
      })
    }
}
</script>

<style scoped>

</style>