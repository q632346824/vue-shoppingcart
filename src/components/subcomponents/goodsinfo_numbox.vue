
<template>
    <div class="mui-numbox" data-numbox-min='1' :data-numbox-max='max'>
         <!-- 因为max一开始为undefined,可以用watch监听,获取最后一次值 -->
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged" ref="numbox"/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>

<script>


export default {
  name: 'goodsinfo_number',
  mounted(){
      this.mui(".mui-numbox").numbox()
  },
  methods:{
      countChanged(){
          this.$emit('getcount',parseInt(this.$refs.numbox.value))
      }
  },
  props:["max"],
  watch:{
      'max':function(newVal){      
          this.mui(".mui-numbox").numbox().setOption('max',newVal)
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
