<template>
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="item in slides" :key="item.img">
            <img :src="item.img" alt="" :class="{full:isfull}">
        </mt-swipe-item>
    </mt-swipe>
</template>

<script>
export default {
  name: 'swiper',
  props:['slides','isfull']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .mint-swipe{
        height:200px;
    .mint-swipe-item{
      text-align:center;
    }
        img{
            // width:100%;
            height:100%;
        }
    }

.full{
  width:100%
}
</style>
