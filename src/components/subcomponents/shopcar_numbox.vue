
<template>
    <div class="mui-numbox" data-numbox-min='1' >
         <!-- 因为max一开始为undefined,可以用watch监听,获取最后一次值 -->
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" :value="this.initcount" @change="countChanged" ref="numbox"/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>

<script>


export default {
  name: 'shopcar_numbox',
  props:['initcount','goodsid'],
  mounted(){
      this.mui(".mui-numbox").numbox()
  },
  methods:{
      countChanged(){
        this.$store.commit('updateGoodsInfo',{id:this.goodsid,count:this.$refs.numbox.value})
      }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
